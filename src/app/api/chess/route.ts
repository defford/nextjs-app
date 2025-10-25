import { NextRequest } from 'next/server';
import { Chess } from 'chess.js';

// Global game state
let game = new Chess();

export async function GET(req: NextRequest) {
  // This is a placeholder for WebSocket upgrade
  // In a real implementation, you'd need to handle the WebSocket upgrade
  return new Response('WebSocket endpoint', { status: 200 });
}

// For development, we'll use a simple polling approach instead of WebSockets
// This is more compatible with Next.js App Router
export async function POST(req: NextRequest) {
  try {
    const { action, move } = await req.json();
    
    if (action === 'getGameState') {
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
    
    if (action === 'makeMove' && move) {
      try {
        const result = game.move(move);
        if (result) {
          return Response.json({
            success: true,
            fen: game.fen(),
            turn: game.turn(),
            isGameOver: game.isGameOver(),
            isCheck: game.isCheck(),
            isCheckmate: game.isCheckmate(),
            isStalemate: game.isStalemate(),
            moveHistory: game.history(),
            lastMove: result
          });
        } else {
          return Response.json({ success: false, error: 'Invalid move' });
        }
      } catch (error) {
        return Response.json({ success: false, error: 'Invalid move' });
      }
    }
    
    if (action === 'resetGame') {
      game = new Chess();
      return Response.json({
        success: true,
        fen: game.fen(),
        turn: game.turn(),
        isGameOver: game.isGameOver(),
        isCheck: game.isCheck(),
        isCheckmate: game.isCheckmate(),
        isStalemate: game.isStalemate(),
        moveHistory: game.history()
      });
    }
    
    return Response.json({ success: false, error: 'Invalid action' });
  } catch (error) {
    return Response.json({ success: false, error: 'Server error' });
  }
}
