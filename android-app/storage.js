// Preferences uses SharedPreferences on Android. One JSON snapshot keeps
// history, pending quests and settings consistent across writes.
export function createStore(preferences, key, validate) {
  let pending = Promise.resolve();
  return {
    async raw() {
      await pending;
      return (await preferences.get({ key })).value;
    },
    save(data) {
      // Validate and serialize at call time so later mutations cannot leak in.
      const value = JSON.stringify(validate(data));
      const operation = pending.then(() => preferences.set({ key, value }));
      pending = operation.catch(() => {});
      return operation;
    },
  };
}
