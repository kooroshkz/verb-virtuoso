import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, BookOpen } from "lucide-react";

interface QuizStatsProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export const QuizStats = ({ score, total, onRestart }: QuizStatsProps) => {
  const percentage = Math.round((score / total) * 100);
  
  const getScoreColor = () => {
    if (percentage >= 80) return "text-correct";
    if (percentage >= 60) return "text-warning";
    return "text-incorrect";
  };

  const getScoreMessage = () => {
    if (percentage >= 90) return "Excellent! Perfect Dutch!";
    if (percentage >= 80) return "Great job! Almost perfect!";
    if (percentage >= 70) return "Good work! Keep practicing!";
    if (percentage >= 60) return "Not bad! Room for improvement.";
    return "Keep studying! Practice makes perfect.";
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="p-8 bg-gradient-to-br from-card to-accent/5 border-border/50 shadow-lg backdrop-blur text-center">
        <div className="mb-6">
          <Trophy className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold text-foreground mb-2">Quiz Complete!</h2>
          <p className="text-muted-foreground">Here are your results</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-gradient-to-r from-accent/20 to-accent/10 rounded-lg p-6 border border-accent/20">
            <div className={`text-4xl font-bold ${getScoreColor()} mb-2`}>
              {score}/{total}
            </div>
            <div className={`text-2xl font-semibold ${getScoreColor()} mb-2`}>
              {percentage}%
            </div>
            <p className="text-sm text-muted-foreground">
              {getScoreMessage()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-correct/10 rounded-lg p-3 border border-correct/20">
              <div className="text-correct font-semibold text-lg">{score}</div>
              <div className="text-foreground">Correct</div>
            </div>
            <div className="bg-incorrect/10 rounded-lg p-3 border border-incorrect/20">
              <div className="text-incorrect font-semibold text-lg">{total - score}</div>
              <div className="text-foreground">Incorrect</div>
            </div>
          </div>
        </div>

        <Button
          onClick={onRestart}
          className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 transition-all duration-300 flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Start New Quiz
        </Button>
      </Card>
    </div>
  );
};