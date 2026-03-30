==================================================================================================

CIVITAS - LANDING PAGE

==================================================================================================

Rodar local (Docker):

  docker build -t civitas-landing:local .
  docker run --rm -p 8080:8080 civitas-landing:local
  # abrir http://localhost:8080

GitOps / Argo CD:

- O Argo CD aponta para a pasta `k8s/` (Kustomize) e renderiza o `base-chart` via `helmCharts`.

