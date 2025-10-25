'use client';

import { useState, useEffect, useCallback } from 'react';
import { Chessboard } from 'react-chessboard';
import Navigation from '@/components/Navigation';
import Pusher from 'pusher-js';

interface GameState {
  fen: string;
  turn: 'w' | 'b';
  isGameOver: boolean;
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  moveHistory: string[];
  lastMove?: any;
}

export default function ChessPage() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMakingMove, setIsMakingMove] = useState(false);

  const makeMove = useCallback(async (move: string) => {
    if (isMakingMove) return;
    
    setIsMakingMove(true);
    try {
      const response = await fetch('/api/chess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'makeMove', move })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setGameState(data);
        setError(null);
      } else {
        setError(data.error || 'Invalid move');
      }
    } catch (err) {
      setError('Failed to make move');
      console.error('Error making move:', err);
    } finally {
      setIsMakingMove(false);
    }
  }, [isMakingMove]);

  const resetGame = useCallback(async () => {
    try {
      const response = await fetch('/api/chess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'resetGame' })
      });
      
      const data = await response.json();
      if (data.success) {
        setGameState(data);
        setError(null);
      }
    } catch (err) {
      setError('Failed to reset game');
      console.error('Error resetting game:', err);
    }
  }, []);

  const fetchGameState = useCallback(async () => {
    try {
      const response = await fetch('/api/chess', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) throw new Error('Failed to fetch game state');
      
      const data = await response.json();
      setGameState(data);
      setError(null);
    } catch (err) {
      setError('Failed to load game state');
      console.error('Error fetching game state:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGameState();
    
    // Set up Pusher for real-time updates
    const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY;
    const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2';
    
    console.log('Pusher Key:', pusherKey);
    console.log('Pusher Cluster:', pusherCluster);
    
    if (!pusherKey) {
      console.error('PUSHER_KEY is not defined');
      return;
    }
    
    const pusher = new Pusher(pusherKey, {
      cluster: pusherCluster,
    });

    const channel = pusher.subscribe('chess-game');
    
    channel.bind('pusher:subscription_succeeded', () => {
      console.log('Successfully subscribed to chess-game channel');
    });
    
    channel.bind('pusher:subscription_error', (error: any) => {
      console.error('Subscription error:', error);
    });

    // Listen for move events from other clients
    channel.bind('move-made', (data: GameState) => {
      console.log('Received move-made event:', data);
      console.log('Updating gameState from:', gameState?.fen, 'to:', data.fen);
      setGameState(data);
      setError(null);
    });

    // Listen for game reset events
    channel.bind('game-reset', (data: GameState) => {
      console.log('Received game-reset event:', data);
      setGameState(data);
      setError(null);
    });

    return () => {
      pusher.unsubscribe('chess-game');
      pusher.disconnect();
    };
  }, [fetchGameState]);

  const handlePieceDrop = ({ piece, sourceSquare, targetSquare }: { piece: any; sourceSquare: string; targetSquare: string | null }) => {
    if (!gameState || gameState.isGameOver || isMakingMove || !targetSquare) return false;
    
    // Convert to algebraic notation for the API
    const moveString = `${sourceSquare}${targetSquare}`;
    makeMove(moveString);
    
    return true; // Allow the move (will be validated server-side)
  };

  const getGameStatus = () => {
    if (!gameState) return 'Loading...';
    if (gameState.isCheckmate) return 'Checkmate!';
    if (gameState.isStalemate) return 'Stalemate!';
    if (gameState.isCheck) return `${gameState.turn === 'w' ? 'White' : 'Black'} is in check`;
    return `${gameState.turn === 'w' ? 'White' : 'Black'}'s turn`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 dark:border-zinc-100 mx-auto mb-4"></div>
          <p className="text-zinc-600 dark:text-zinc-400">Loading chess game...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Navigation />
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Live Chess Game
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Anyone can make a move for the current player's turn
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chess Board */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    {gameState && (
                      <Chessboard
                        key={gameState.fen} // Force re-render when position changes
                        options={{
                          position: gameState.fen,
                          onPieceDrop: handlePieceDrop,
                          boardStyle: {
                            borderRadius: '4px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
                
                {error && (
                  <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-md">
                    <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Game Info */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                  Game Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Status:</span>
                    <span className={`text-sm font-medium ${
                      gameState?.isCheckmate ? 'text-red-600 dark:text-red-400' :
                      gameState?.isStalemate ? 'text-yellow-600 dark:text-yellow-400' :
                      gameState?.isCheck ? 'text-orange-600 dark:text-orange-400' :
                      'text-zinc-900 dark:text-zinc-100'
                    }`}>
                      {getGameStatus()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Current Turn:</span>
                    <span className={`text-sm font-medium ${
                      gameState?.turn === 'w' ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'
                    }`}>
                      {gameState?.turn === 'w' ? 'White' : 'Black'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                  Move History
                </h3>
                <div className="max-h-48 overflow-y-auto">
                  {gameState?.moveHistory && gameState.moveHistory.length > 0 ? (
                    <div className="space-y-1">
                      {gameState.moveHistory.map((move, index) => (
                        <div key={index} className="text-sm text-zinc-600 dark:text-zinc-400">
                          {index + 1}. {move}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-500 dark:text-zinc-500">No moves yet</p>
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                  Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={resetGame}
                    className="w-full px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
                  >
                    Reset Game
                  </button>
                  
                  <button
                    onClick={fetchGameState}
                    disabled={isMakingMove}
                    className="w-full px-4 py-2 bg-zinc-600 dark:bg-zinc-600 text-white rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50"
                  >
                    Refresh Game
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              Drag and drop pieces to make moves. Anyone can move for the current player's turn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
