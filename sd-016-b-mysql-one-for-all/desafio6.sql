SELECT
  FORMAT(MIN(S.price), 2) AS `faturamento_minimo`,
  FORMAT(MAX(S.price), 2) AS `faturamento_maximo`,
  FORMAT(AVG(S.price), 2) AS `faturamento_medio`,
  FORMAT(SUM(S.price), 2) AS `faturamento_total`
FROM SpotifyClone.User AS U
INNER JOIN SpotifyClone.Subscription AS S
ON U.sub_type = S.sub_type;