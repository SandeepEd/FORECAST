export interface GeoCodingResult {
  result: {
    addressMatches: Array<{
      coordinates: {
        x: number;
        y: number;
      };
    }>;
  };
}

// export interface
