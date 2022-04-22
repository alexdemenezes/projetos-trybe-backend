SELECT S.song_name AS `cancao`, COUNT(R.song_id) AS `reproducoes`
FROM SpotifyClone.Reproduction AS R
INNER JOIN SpotifyClone.Song AS S
ON R.song_id = S.song_id
GROUP BY S.song_id
ORDER BY `reproducoes` DESC, `cancao`
LIMIT 2;