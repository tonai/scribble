import { randomInt } from "./math";

export type SoundSources = Record<string, string | string[]>

export interface ISoundInstances {
  instances : HTMLAudioElement[];
  source:string;
}

export type SoundInstances = Record<string, ISoundInstances | ISoundInstances[]>

const soundInstances: SoundInstances = {};

export function initSounds(sources: SoundSources) {
  for (const [id, source] of Object.entries(sources)) {
    if (typeof source === "string") {
      soundInstances[id] = { source, instances: [new Audio(source)] };
    } else {
      soundInstances[id] = source.map((source) => ({
        source,
        instances: [new Audio(source)],
      }));
    }
  }
}

export function playSound(
  name: string,
  volume: number = 1,
) {
  const list = soundInstances[name];
  if (!list) {
    return;
  }

  const { instances, source } =
    list instanceof Array
      ? (list[randomInt(list.length - 1)] as ISoundInstances)
      : (list as ISoundInstances);
  let instance = instances.find((instance) => instance.paused);
  if (!instance) {
    instance = new Audio(source);
    instances.push(instance);
  }
  try {
    instance.volume = volume;
    instance.play();
  } catch (_e) {
    // Sounds may be blocked by browser
  }

  return instance;
}

export function playMusic(
  name: keyof typeof soundInstances,
  volume: number = 1,
  loop: boolean = true,
) {
  const instance = playSound(name, volume);
  if (instance) {
    instance.loop = loop;
  }
  return instance;
}