export default {
    SET_REGIONS(state, regions) {
        state.regions = regions;
        state.regionsMap = new Map();
        for (const region of regions) {
          state.regionsMap.set(region.id, region);
        }
    }
}
