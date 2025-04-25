'use client';

import { useState } from 'react';

type Choice = {
  text: string;
  nextScene: string;
};

type Scene = {
  sceneId: string;
  text: string;
  choices: Choice[];
};

type Props = {
  scenes: Scene[];
};

export default function PlayMode({ scenes }: Props) {
  const [currentSceneId, setCurrentSceneId] = useState<string>(scenes[0]?.sceneId || '');

  const currentScene = scenes.find((scene) => scene.sceneId === currentSceneId);

  if (!currentScene) {
    return <div className="p-4">シーンが見つかりません。</div>;
  }

  const handleChoice = (nextSceneId: string) => {
    if (nextSceneId === '') {
      alert('ジャンプ先が未設定です');
      return;
    }
    setCurrentSceneId(nextSceneId);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-xl font-bold mb-4">🎮 プレイモード</h2>

      <div className="mb-6 whitespace-pre-wrap">{currentScene.text}</div>

      <div className="space-y-2">
        {currentScene.choices.map((choice, index) => (
          <button
            key={index}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleChoice(choice.nextScene)}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}
