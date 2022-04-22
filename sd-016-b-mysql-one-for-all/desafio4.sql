SELECT
  U.username AS `usuario`,
  IF (MAX(YEAR(R.reproduction_date)) = 2021, 'Usuário ativo', 'Usuário inativo') AS `condicao_usuario`
FROM SpotifyClone.Reproduction AS R
INNER JOIN SpotifyClone.User AS U
ON U.user_id = R.user_id
GROUP BY U.user_id
ORDER BY U.username;