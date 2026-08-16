"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GameMap from "@/components/GameMap";
import Character from "@/components/Character";
import CharacterInfo from "@/components/CharacterInfo";
import DecisionButtons from "@/components/DecisionButtons";
import ConsequencePanel from "@/components/ConsequencePanel";
import people from "../data/people";

export default function Decide() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [decision, setDecision] = useState(null);
  const [score, setScore] = useState(0);
  const [lastScoreChange, setLastScoreChange] = useState(0);


  useEffect(() => {
    try {
      const { setRoundScore, setLastScoreChange: setGlobalLast, setTotalScore } = require("@/lib/scoreStore");
      setRoundScore(score);
      setGlobalLast(lastScoreChange);
    } catch (e) {
      console.warn("Could not sync to global score store:", e);
    }
  }, [score, lastScoreChange]);

  const currentPerson = people[currentIndex];
  const isLastCase = currentIndex === people.length - 1;

  function handleInspectClick() {
    setShowInfo(!showInfo);
  }

  function makeDecision(playerChoice) {
    let scoreChange = -5;
    if (playerChoice === currentPerson.correctAnswer) {
      scoreChange = 15;
    }

    setScore(score + scoreChange);
    setLastScoreChange(scoreChange);
    setDecision(playerChoice);
  }

  function handleAccept() {
    makeDecision("ACCEPT");
  }

  function handleReject() {
    makeDecision("REJECT");
  }

  function handleNext() {
  if (isLastCase) {
    try {
      const { addToTotalScore } = require("@/lib/scoreStore");

      // Add this question round's score to the global score
      addToTotalScore(score);
    } catch (e) {
      console.warn("Could not update global score:", e);
    }

    router.push("/final");
    return;
  }

  setCurrentIndex(currentIndex + 1);
  setDecision(null);
  setShowInfo(false);
}


  const consequenceMessage =
    decision === "ACCEPT" ? currentPerson.accept_outcome : currentPerson.reject_outcome;

  return (
    <div className="game-container">
      <div className="center">
        <p className="case-counter jersey">
          CASE {currentIndex + 1} OF {people.length}
        </p>
        <p className="phase-score jersey">ROUND SCORE: {score}</p>

        <GameMap>
          <Character name={currentPerson.name} />
        </GameMap>

        <div className="character-name jersey">{currentPerson.name}</div>

        <button className="inspect-button jersey" onClick={handleInspectClick}>
          {showInfo ? "CLOSE" : "INSPECT"}
        </button>

        {showInfo && (
          <CharacterInfo
            name={currentPerson.name}
            crimeProbability={currentPerson.crime_probability}
            healthStatus={currentPerson.health_status}
            dependents={currentPerson.dependents}
            aiRecommendation={currentPerson.ai_recommendation}
          />
        )}

        {decision === null ? (
          <DecisionButtons onAccept={handleAccept} onReject={handleReject} />
        ) : (
          <ConsequencePanel
            message={consequenceMessage}
            scoreChange={lastScoreChange}
            onNext={handleNext}
            isLastCase={isLastCase}
          />
        )}
      </div>
    </div>
  );

