Dusk.initLogic({
  minPlayers: 1,
  maxPlayers: 6,
  reactive: true,
  setup: (allPlayerIds) => ({
    drawingPayer: allPlayerIds[0],
    dump: '',
    playerIds: allPlayerIds,
  }),
  actions: {
    draw: (dump: string, { game, playerId }) => {
      if (playerId !== game.drawingPayer) {
        return Dusk.invalidAction();
      }
      game.dump = dump;
    }
  },
});
