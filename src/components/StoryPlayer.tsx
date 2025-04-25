'use client';

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

import { useState } from 'react';

export default function StoryPlayer({ scenes }: Props) {
  const [currentId, setCurrentId] = useState('start');
  const scene = scenes.find((s) => s.sceneId === currentId);

  if (!scene) return <div>シーンが見つかりません: {currentId}</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">▶ プレイモード</h2>
      <p className="mb-4">{scene.text}</p>

      <div className="space-y-2">
        {scene.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => setCurrentId(choice.nextScene)}
            className="block w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}
