import { Manifest, ManifestOverride } from '../redux/application/types';
import { ImagesFromManifest, ManifestImageViewKeys } from './orgImages';

export const updateKeyInManifestOverride = (manifestOverride: ManifestOverride, key: keyof ManifestOverride, value): ManifestOverride => {
  if (!key) return manifestOverride;

  return value ? setInManifestOverride(manifestOverride, key, value) : removeFromManifestOverride(manifestOverride, key);
};

const removeFromManifestOverride = (manifestOverride: ManifestOverride, key: keyof ManifestOverride): ManifestOverride => {
  if (key === ManifestImageViewKeys.shortcut) {
    const { shortcut, startup_app, ...rest } = manifestOverride;

    return rest;
  } else {
    const { [key]: oldValue, ...rest } = manifestOverride;

    return rest;
  }
};

const setInManifestOverride = (manifestOverride: ManifestOverride, key: keyof ManifestOverride, value): ManifestOverride => {
  const overrideUpdates = key === ManifestImageViewKeys.shortcut ? { shortcut: { icon: value }, startup_app: { icon: value } } : { [key]: value };

  return { ...manifestOverride, ...overrideUpdates };
};

export const getImagesFromManifestOverrideOrManifest = (manifest: Manifest, manifestOverride: ManifestOverride): ImagesFromManifest => {
  const { shortcut, splashScreenImage } = manifestOverride;

  const { shortcut: originalShortcut, splashScreenImage: originalSplashScreenImage } = manifest;

  const shortcutIcon = shortcut && shortcut.icon ? shortcut.icon : originalShortcut.icon;

  return {
    [ManifestImageViewKeys.splashscreen]: splashScreenImage || originalSplashScreenImage,
    [ManifestImageViewKeys.shortcut]: shortcutIcon,
  };
};

export const getShortcutNameFromManifestOverrideOrManifest = (manifest: Manifest, manifestOverride: ManifestOverride): string => {
  const { shortcut } = manifestOverride;

  const { shortcut: originalShortcut } = manifest;

  const shortcutName = shortcut && shortcut.name ? shortcut.name : originalShortcut.name;
  return shortcutName || '';
};

export const isManifestDefault = (manifestOverride: Manifest, key: ManifestImageViewKeys): boolean => {
  if (key === ManifestImageViewKeys.shortcut) {
    return !manifestOverride.shortcut || !manifestOverride.shortcut.icon;
  }

  return !manifestOverride[key];
};
