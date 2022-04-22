SELECT
  U.username AS `usuario`,
  COUNT(R.user_id) AS `qtde_musicas_ouvidas`,
  CAST(SUM(S.duration / 60) AS DECIMAL(16, 2)) AS `total_minutos`
FROM SpotifyClone.User AS U
  INNER JOIN SpotifyClone.Reproduction AS R
  ON U.user_id = R.user_id
  INNER JOIN SpotifyClone.Song AS S
  ON S.song_id = R.song_id
GROUP BY U.user_id
ORDER BY U.username;