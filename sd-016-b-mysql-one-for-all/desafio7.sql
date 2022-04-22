SELECT
  TRIM(CONCAT(ART.first_name, ' ', ART.last_name)) AS `artista`,
  ALB.album_name AS `album`,
  COUNT(UA.user_id) AS `seguidores`
FROM SpotifyClone.Album AS ALB
  INNER JOIN SpotifyClone.Artist AS ART
  ON ALB.artist_id = ART.artist_id
  INNER JOIN SpotifyClone.User_Artist AS UA
  ON ALB.artist_id = UA.artist_id
GROUP BY ALB.album_id
ORDER BY `seguidores` DESC, `artista`, `album`;
