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
  initialScenes: Scene[];
  onChange: (scenes: Scene[]) => void;
};

export default function MonogatariMaker({ initialScenes, onChange }: Props) {
  const [scenes, setScenes] = useState<Scene[]>(initialScenes);

  // シーンを追加
  const addScene = () => {
    const newScene: Scene = {
      sceneId: `scene${scenes.length + 1}`,
      text: 'これは新しいシーンです。',
      choices: [{ text: '次へ', nextScene: '' }],
    };
    const updatedScenes = [...scenes, newScene];
    setScenes(updatedScenes);
    onChange(updatedScenes);
  };

  // シーンの削除
  const deleteScene = (index: number) => {
    const updatedScenes = scenes.filter((_, i) => i !== index);
    setScenes(updatedScenes);
    onChange(updatedScenes);
  };

  // シーンの並び替え（上へ）
  const moveSceneUp = (index: number) => {
    if (index === 0) return;
    const updatedScenes = [...scenes];
    [updatedScenes[index - 1], updatedScenes[index]] = [updatedScenes[index], updatedScenes[index - 1]];
    setScenes(updatedScenes);
    onChange(updatedScenes);
  };

  // シーンの並び替え（下へ）
  const moveSceneDown = (index: number) => {
    if (index === scenes.length - 1) return;
    const updatedScenes = [...scenes];
    [updatedScenes[index], updatedScenes[index + 1]] = [updatedScenes[index + 1], updatedScenes[index]];
    setScenes(updatedScenes);
    onChange(updatedScenes);
  };

  // 選択肢を追加
  const addChoice = (sceneIndex: number) => {
    const updatedScenes = [...scenes];
    updatedScenes[sceneIndex].choices.push({ text: '新しい選択肢', nextScene: '' });
    setScenes(updatedScenes);
    onChange(updatedScenes);
  };

  // 選択肢を削除
  const deleteChoice = (sceneIndex: number, choiceIndex: number) => {
    const updatedScenes = [...scenes];
    updatedScenes[sceneIndex].choices.splice(choiceIndex, 1);
    setScenes(updatedScenes);
    onChange(updatedScenes);
  };

  return (
    <div className="border p-4 bg-white rounded shadow">
      <h2 className="font-bold text-xl mb-4">🛠 物語エディター</h2>

      {scenes.map((scene, sceneIndex) => (
        <div key={scene.sceneId} className="mb-6 border p-4 rounded bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">🧩 シーンID: {scene.sceneId}</h3>
            <div className="space-x-2">
              <button onClick={() => moveSceneUp(sceneIndex)} className="px-2 py-1 bg-blue-200 rounded">↑</button>
              <button onClick={() => moveSceneDown(sceneIndex)} className="px-2 py-1 bg-blue-200 rounded">↓</button>
              <button onClick={() => deleteScene(sceneIndex)} className="px-2 py-1 bg-red-200 rounded">削除</button>
            </div>
          </div>

          <textarea
            className="w-full border p-2 rounded"
            value={scene.text}
            onChange={(e) => {
              const updatedScenes = [...scenes];
              updatedScenes[sceneIndex] = {
                ...updatedScenes[sceneIndex],
                text: e.target.value
              };
              setScenes(updatedScenes);
              onChange(updatedScenes);
            }}
          />

{scene.choices.map((choice, choiceIndex) => (
  <div key={choiceIndex} className="mt-2">
    <label className="block text-sm font-medium">選択肢 {choiceIndex + 1}</label>

    {/* 選択肢のテキスト */}
    <input
      type="text"
      className="w-full border p-2 mb-1"
      value={choice.text}
      onChange={(e) => {
        const updatedScenes = [...scenes];
        updatedScenes[sceneIndex].choices[choiceIndex].text = e.target.value;
        setScenes(updatedScenes);
        onChange(updatedScenes);
      }}
    />

    {/* ▼ 新しく追加：ジャンプ先セレクトボックス */}
    <label className="block text-sm font-medium">ジャンプ先シーン</label>
    <select
      className="w-full border p-2"
      value={choice.nextScene}
      onChange={(e) => {
        const updatedScenes = [...scenes];
        updatedScenes[sceneIndex].choices[choiceIndex].nextScene = e.target.value;
        setScenes(updatedScenes);
        onChange(updatedScenes);
      }}
    >
      <option value="">-- 選んでください --</option>
      {scenes.map((s) => (
        <option key={s.sceneId} value={s.sceneId}>
          {s.sceneId}
        </option>
      ))}
    </select>
  </div>
))}


          <button
            onClick={() => addChoice(sceneIndex)}
            className="mt-2 px-3 py-1 bg-green-200 rounded"
          >
            ＋ 選択肢を追加
          </button>
        </div>
      ))}

      <button
        onClick={addScene}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        ＋ シーンを追加
      </button>

      <pre className="bg-gray-100 mt-6 p-2 rounded text-sm overflow-x-auto">
        {JSON.stringify(scenes, null, 2)}
      </pre>
    </div>
  );
}
