import { NextRequest } from 'next/server';
import { Chess } from 'chess.js';
import pusher from '@/lib/pusher';

// Global game state
let game = new Chess();

export async function GET(req: NextRequest) {
  return Response.json({
    fen: game.fen(),
    turn: game.turn(),
    isGameOver: game.isGameOver(),
    isCheck: game.isCheck(),
    isCheckmate: game.isCheckmate(),
    isStalemate: game.isStalemate(),
    moveHistory: game.history()
  });
}

export async function POST(req: NextRequest) {
  try {
    const { action, move } = await req.json();
    
    if (action === 'makeMove' && move) {
      try {
        const result = game.move(move);
        if (result) {
          const gameState = {
            success: true,
            fen: game.fen(),
            turn: game.turn(),
            isGameOver: game.isGameOver(),
            isCheck: game.isCheck(),
            isCheckmate: game.isCheckmate(),
            isStalemate: game.isStalemate(),
            moveHistory: game.history(),
            lastMove: result
          };

          // Broadcast the move to all connected clients
          console.log('Broadcasting move-made event:', gameState);
          await pusher.trigger('chess-game', 'move-made', gameState);

          return Response.json(gameState);
        } else {
          return Response.json({ success: false, error: 'Invalid move' });
        }
      } catch (error) {
        return Response.json({ success: false, error: 'Invalid move' });
      }
    }
    
    if (action === 'resetGame') {
      game = new Chess();
      const gameState = {
        success: true,
        fen: game.fen(),
        turn: game.turn(),
        isGameOver: game.isGameOver(),
        isCheck: game.isCheck(),
        isCheckmate: game.isCheckmate(),
        isStalemate: game.isStalemate(),
        moveHistory: game.history()
      };

      // Broadcast the game reset to all connected clients
      console.log('Broadcasting game-reset event:', gameState);
      await pusher.trigger('chess-game', 'game-reset', gameState);

      return Response.json(gameState);
    }
    
    return Response.json({ success: false, error: 'Invalid action' });
  } catch (error) {
    return Response.json({ success: false, error: 'Server error' });
  }
}
