import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { DutchVerb } from "@/data/verbs";

interface VerbCardProps {
  verb: DutchVerb;
  onNext: (score: number) => void;
  showScore?: boolean;
  currentScore?: number;
  totalQuestions?: number;
}

export const VerbCard = ({ verb, onNext, showScore, currentScore, totalQuestions }: VerbCardProps) => {
  const [perfectumAnswer, setPerfectumAnswer] = useState("");
  const [imperfectumSingular, setImperfectumSingular] = useState("");
  const [imperfectumPlural, setImperfectumPlural] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isCorrect, setIsCorrect] = useState({ 
    perfectum: false, 
    imperfectumSingular: false, 
    imperfectumPlural: false 
  });

  const checkAnswers = () => {
    const perfectumCorrect = perfectumAnswer.toLowerCase().trim() === verb.perfectum.toLowerCase();
    const imperfectumSingularCorrect = imperfectumSingular.toLowerCase().trim() === verb.imperfectum[0].toLowerCase();
    const imperfectumPluralCorrect = imperfectumPlural.toLowerCase().trim() === verb.imperfectum[1].toLowerCase();
    
    setIsCorrect({
      perfectum: perfectumCorrect,
      imperfectumSingular: imperfectumSingularCorrect,
      imperfectumPlural: imperfectumPluralCorrect
    });
    setShowResults(true);
  };

  const resetCard = () => {
    setPerfectumAnswer("");
    setImperfectumSingular("");
    setImperfectumPlural("");
    setShowResults(false);
    setIsCorrect({ perfectum: false, imperfectumSingular: false, imperfectumPlural: false });
  };

  const handleNext = () => {
    // Calculate score: all three answers need to be correct for full points
    const score = (isCorrect.perfectum && isCorrect.imperfectumSingular && isCorrect.imperfectumPlural) ? 1 : 0;
    resetCard();
    onNext(score);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {showScore && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <span className="text-sm font-medium text-foreground">
              Score: {currentScore}/{totalQuestions}
            </span>
          </div>
        </div>
      )}
      
      <Card className="p-8 bg-gradient-to-br from-card to-accent/5 border-border/50 shadow-lg backdrop-blur">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {verb.infinitive}
          </h2>
          <p className="text-muted-foreground">Fill in the correct forms</p>
        </div>

        <div className="space-y-6">
          {/* Perfectum */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Perfectum
            </label>
            <div className="relative">
              <Input
                value={perfectumAnswer}
                onChange={(e) => setPerfectumAnswer(e.target.value)}
                placeholder="e.g., heb gewerkt"
                disabled={showResults}
                className={`transition-all duration-300 ${
                  showResults
                    ? isCorrect.perfectum
                      ? "border-correct bg-correct/5"
                      : "border-incorrect bg-incorrect/5"
                    : "border-border"
                }`}
              />
              {showResults && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isCorrect.perfectum ? (
                    <CheckCircle className="h-5 w-5 text-correct" />
                  ) : (
                    <XCircle className="h-5 w-5 text-incorrect" />
                  )}
                </div>
              )}
            </div>
            {showResults && !isCorrect.perfectum && (
              <p className="text-sm text-incorrect">
                Correct answer: <span className="font-medium">{verb.perfectum}</span>
              </p>
            )}
          </div>

          {/* Imperfectum - Horizontal Layout */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Imperfectum
            </label>
            <div className="grid grid-cols-2 gap-4">
              {/* Singular */}
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">
                  Singular
                </label>
                <div className="relative">
                  <Input
                    value={imperfectumSingular}
                    onChange={(e) => setImperfectumSingular(e.target.value)}
                    placeholder="e.g., werkte"
                    disabled={showResults}
                    className={`transition-all duration-300 ${
                      showResults
                        ? isCorrect.imperfectumSingular
                          ? "border-correct bg-correct/5"
                          : "border-incorrect bg-incorrect/5"
                        : "border-border"
                    }`}
                  />
                  {showResults && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isCorrect.imperfectumSingular ? (
                        <CheckCircle className="h-4 w-4 text-correct" />
                      ) : (
                        <XCircle className="h-4 w-4 text-incorrect" />
                      )}
                    </div>
                  )}
                </div>
                {showResults && !isCorrect.imperfectumSingular && (
                  <p className="text-xs text-incorrect">
                    Correct: <span className="font-medium">{verb.imperfectum[0]}</span>
                  </p>
                )}
              </div>

              {/* Plural */}
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">
                  Plural
                </label>
                <div className="relative">
                  <Input
                    value={imperfectumPlural}
                    onChange={(e) => setImperfectumPlural(e.target.value)}
                    placeholder="e.g., werkten"
                    disabled={showResults}
                    className={`transition-all duration-300 ${
                      showResults
                        ? isCorrect.imperfectumPlural
                          ? "border-correct bg-correct/5"
                          : "border-incorrect bg-incorrect/5"
                        : "border-border"
                    }`}
                  />
                  {showResults && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isCorrect.imperfectumPlural ? (
                        <CheckCircle className="h-4 w-4 text-correct" />
                      ) : (
                        <XCircle className="h-4 w-4 text-incorrect" />
                      )}
                    </div>
                  )}
                </div>
                {showResults && !isCorrect.imperfectumPlural && (
                  <p className="text-xs text-incorrect">
                    Correct: <span className="font-medium">{verb.imperfectum[1]}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          {!showResults ? (
            <Button 
              onClick={checkAnswers}
              disabled={!perfectumAnswer || !imperfectumSingular || !imperfectumPlural}
              className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 transition-all duration-300"
            >
              Check Answers
            </Button>
          ) : (
            <>
              <Button
                onClick={resetCard}
                variant="outline"
                className="flex items-center gap-2 border-border hover:bg-accent/50"
              >
                <RotateCcw className="h-4 w-4" />
                Try Again
              </Button>
              <Button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 transition-all duration-300"
              >
                Next Verb
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};