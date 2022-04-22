SELECT
  CONCAT(ART.first_name, ' ', ART.last_name) AS `artista`,
  ALB.album_name AS `album`
FROM SpotifyClone.Artist AS ART
INNER JOIN SpotifyClone.Album as ALB
ON ART.artist_id = ALB.artist_id
WHERE CONCAT(ART.first_name, ' ', ART.last_name) = 'Walter Phoenix'
ORDER BY ALB.album_name;