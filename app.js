var strongPasswordChecker = function (password) {
  let add = 0,
    del = 0;

  // Add characters to increase length to 6 characters
  if (password.length < 6) add = 6 - password.length;

  // Delete characters to reduce length to 20 characters
  if (password.length > 20) del = password.length - 20;

  let mutate = 0,
    eliminatable = [0, 0, 0],
    lower = 1,
    upper = 1,
    digit = 1;

  // Check for instances of three or more in a row and note presence of required characters
  for (let i = 0, prev, run = 1, added = 0; i <= password.length; i++) {
    let char = password[i];

    if (char >= "a" && char <= "z") lower = 0;
    else if (char >= "A" && char <= "Z") upper = 0;
    else if (char >= "0" && char <= "9") digit = 0;

    if (char === prev) {
      run++;

      // Use additions to break runs before even considering mutations
      if (add > added && run === 3) {
        added++;
        run = 1;
      }
    } else {
      if (run > 2) {
        // Sum up needed mutations to break up the run
        mutate += Math.floor(run / 3);

        // Count mutations eliminatable by using deletions, indexed by how many
        // deletions are needed to eliminate them (index 0 means one deletion needed)
        eliminatable[run % 3]++;
      }

      run = 1;
    }

    prev = char;
  }

  // Start with how many deletions can be used to eliminate mutations
  let dels = del;

  // Eliminate any mutations by using one deletion
  while (dels && eliminatable[0]--) {
    mutate--;
    dels--;
  }

  // Eliminate any mutations by using two deletions
  while (dels >= 2 && eliminatable[1]--) {
    mutate--;
    dels -= 2;
  }

  // Eliminate any mutations by using three deletions
  while (dels >= 3 && mutate) {
    mutate--;
    dels -= 3;
  }

  // Mutations and additions can be used to simultaneously satisfy required character needs
  let required = lower + upper + digit - add - mutate;

  return add + del + mutate + (required > 0 ? required : 0);
};
