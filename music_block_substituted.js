/* --- 8-bit catchy pub-arcade theme: G major, 150 BPM.
     4 channels data-driven, 128 steps (8 bars) in AABA form.
     Real progression: G (I) -> D (V) -> C (IV) -> G, with a ii-V-I turn (Am7-D7-G).
     Every step creates short-lived nodes that stop automatically. --- */
  const BPM = 150;
  const STEP_MS = Math.round((60 / BPM) * 1000 / 4); // 16th-note at 150 BPM = 100 ms
  // Note frequencies (A4 = 440)
  const N = {
    G2: 98.00, A2: 110.00, B2: 123.47, C3: 130.81, D3: 146.83, E3: 164.81, Fs3: 185.00,
    G3: 196.00, A3: 220.00, B3: 246.94, C4: 261.63, D4: 293.66, E4: 329.63,
    Fs4: 369.99, G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25, D5: 587.33,
    E5: 659.25, Fs5: 739.99, G5: 783.99, A5: 880.00
  };
  // 128-step loop = 8 bars. Form: A (0-31), A (32-63), B (64-95), A' (96-127).
  const BASS = [
    N.G2, N.G2, N.B2, N.D3, 0, N.G2, N.B2, N.D3,
    N.G2, N.G2, N.B2, N.D3, 0, N.D3, N.B2, N.G2,
    N.D3, N.D3, N.Fs3, N.A3, 0, N.D3, N.Fs3, N.A3,
    N.D3, N.D3, N.Fs3, N.A3, N.C3, N.B2, N.A2, N.G2,
    N.C3, N.C3, N.E3, N.G3, 0, N.C3, N.E3, N.G3,
    N.C3, N.C3, N.E3, N.G3, N.A2, N.B2, N.C3, N.D3,
    N.G2, N.G2, N.B2, N.D3, 0, N.G2, N.B2, N.D3,
    N.G2, N.A2, N.B2, N.C3, N.D3, N.G3, N.B2, N.G2,
    N.G2, N.B2, N.D3, N.B2, N.G2, N.B2, N.D3, N.B2,
    N.G2, N.B2, N.D3, N.B2, N.G2, N.D3, N.B2, N.G2,
    N.D3, N.Fs3, N.A3, N.Fs3, N.D3, N.Fs3, N.A3, N.Fs3,
    N.D3, N.Fs3, N.A3, N.C4, N.B3, N.A3, N.G3, N.Fs3,
    N.C3, N.E3, N.G3, N.E3, N.C3, N.E3, N.G3, N.E3,
    N.C3, N.E3, N.G3, N.E3, N.D3, N.C3, N.B2, N.A2,
    N.G2, N.B2, N.D3, N.G3, N.D3, N.B2, N.G2, N.B2,
    N.D3, N.G3, N.B3, N.D4, N.G2, N.B2, N.D3, N.G3
  ];
  const LEAD = [
    N.G4, 0, N.B4, 0, N.D5, 0, N.B4, N.G4,
    N.B4, 0, N.D5, 0, N.G5, 0, N.D5, N.B4,
    N.A4, 0, N.C5, 0, N.E5, 0, N.C5, N.A4,
    N.C5, 0, N.E5, 0, N.A5, 0, 0, 0,
    N.B4, 0, N.D5, 0, N.G5, 0, N.D5, N.B4,
    N.D5, 0, N.G5, 0, N.B5, 0, 0, 0,
    N.C5, 0, N.B4, 0, N.A4, 0, N.G4, N.Fs4,
    N.G4, N.A4, N.B4, N.C5, N.D5, N.B4, N.G4, 0,
    N.G5, 0, N.G5, 0, N.Fs5, N.G5, N.A5, N.G5,
    N.D5, 0, N.D5, 0, N.E5, N.D5, N.B4, N.G4,
    N.A4, 0, N.A4, 0, N.B4, N.A4, N.Fs4, N.D4,
    N.A4, 0, N.B4, 0, N.C5, N.B4, N.A4, N.G4,
    N.G4, 0, N.G4, 0, N.Fs4, N.G4, N.A4, N.G4,
    N.E4, 0, N.E4, 0, N.Fs4, N.E4, N.D4, N.B3,
    N.D4, 0, N.G4, 0, N.B4, 0, N.G4, N.D4,
    N.G4, N.A4, N.B4, N.C5, N.D5, N.G5, N.B4, N.G4
  ];
  const ARP = [
    N.G4, N.B4, N.D5, N.B4, N.G4, N.B4, N.D5, N.B4,
    N.G4, N.B4, N.D5, N.B4, N.G4, N.D5, N.B4, N.G4,
    N.A4, N.C5, N.E5, N.C5, N.A4, N.C5, N.E5, N.C5,
    N.A4, N.C5, N.E5, N.C5, N.A4, N.C5, N.E5, N.C5,
    N.B4, N.D5, N.G5, N.D5, N.B4, N.D5, N.G5, N.D5,
    N.B4, N.D5, N.G5, N.D5, N.B4, N.D5, N.G5, N.D5,
    N.C5, N.E5, N.G5, N.E5, N.C5, N.E5, N.G5, N.E5,
    N.D5, N.C5, N.B4, N.A4, N.G4, N.Fs4, N.G4, N.A4,
    N.G4, N.B4, N.D5, N.B4, N.G4, N.B4, N.D5, N.B4,
    N.G4, N.B4, N.D5, N.B4, N.G4, N.B4, N.D5, N.B4,
    N.A4, N.C5, N.E5, N.C5, N.A4, N.C5, N.E5, N.C5,
    N.A4, N.C5, N.E5, N.C5, N.A4, N.C5, N.E5, N.C5,
    N.B4, N.D5, N.G5, N.D5, N.B4, N.D5, N.G5, N.D5,
    N.B4, N.D5, N.G5, N.D5, N.B4, N.D5, N.G5, N.D5,
    N.C5, N.E5, N.G5, N.E5, N.C5, N.E5, N.G5, N.E5,
    N.C5, N.E5, N.G5, N.E5, N.C5, N.D5, N.B4, N.G4
  ];
  const DRUMS = {
    kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
            1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
            1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
            1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
            1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
            1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
            1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
            1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0],
    hat:   [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0,
            0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1],
    snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
  };
  function musicTick(){
    if (!musicOn || muted) return;
    const i = musicStep % 128;
    if (BASS[i]) tone(BASS[i], 0.18, "triangle", 0.05);
    if (LEAD[i]) tone(LEAD[i], 0.11, "square", 0.04);
    if (ARP[i])  tone(ARP[i],  0.08, "square", 0.018);
    if (DRUMS.kick[i])  tone(55, 0.12, "triangle", 0.08);
    if (DRUMS.hat[i])   noise(0.035, 0.02);
    if (DRUMS.snare[i]) noise(0.07, 0.035);
    musicStep++;
  }
