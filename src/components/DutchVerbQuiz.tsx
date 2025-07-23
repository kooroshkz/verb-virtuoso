import { useState, useEffect } from "react";
import { VerbCard } from "./VerbCard";
import { QuizStats } from "./QuizStats";
import { dutchVerbs, DutchVerb } from "@/data/verbs";
import { BookOpen, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DutchVerbQuiz = () => {
  const [currentVerbIndex, setCurrentVerbIndex] = useState(0);
  const [shuffledVerbs, setShuffledVerbs] = useState<DutchVerb[]>([]);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [showStats, setShowStats] = useState(false);

  // Shuffle verbs on component mount
  useEffect(() => {
    shuffleVerbs();
  }, []);

  const shuffleVerbs = () => {
    const shuffled = [...dutchVerbs].sort(() => Math.random() - 0.5);
    setShuffledVerbs(shuffled);
  };

  const handleNext = () => {
    setAnsweredQuestions(prev => prev + 1);
    
    if (currentVerbIndex < shuffledVerbs.length - 1) {
      setCurrentVerbIndex(prev => prev + 1);
    } else {
      setShowStats(true);
    }
  };

  const handleRestart = () => {
    shuffleVerbs();
    setCurrentVerbIndex(0);
    setScore(0);
    setAnsweredQuestions(0);
    setShowStats(false);
  };

  const updateScore = (correct: boolean) => {
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  if (shuffledVerbs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 animate-pulse text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading verbs...</p>
        </div>
      </div>
    );
  }

  if (showStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
        <QuizStats
          score={score}
          total={shuffledVerbs.length}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <div className="bg-card/50 border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dutch Verb Quiz</h1>
                <p className="text-sm text-muted-foreground">Practice perfectum and imperfectum</p>
              </div>
            </div>
            
            <Button
              onClick={shuffleVerbs}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-border hover:bg-accent/50"
            >
              <Shuffle className="h-4 w-4" />
              Shuffle
            </Button>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="container mx-auto px-4 py-12">
        <VerbCard
          verb={shuffledVerbs[currentVerbIndex]}
          onNext={handleNext}
          showScore={true}
          currentScore={answeredQuestions}
          totalQuestions={shuffledVerbs.length}
        />
        
        {/* Progress indicator */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{currentVerbIndex + 1} of {shuffledVerbs.length}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${((currentVerbIndex + 1) / shuffledVerbs.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};