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

export default function PlayMode({ scenes }: Props) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <p>プレイモード（未実装）</p>
      <pre>{JSON.stringify(scenes, null, 2)}</pre>
    </div>
  );
}
