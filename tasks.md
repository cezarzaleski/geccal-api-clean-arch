# Create patient

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/patient**
2. ✅ Valida dados obrigatórios **fullName**, **birthday**, **sex**, **hospitalizationStatus**
3. ✅ **Cria** um novo paciente
4. ✅ Retorna **200** com o paciente criado

- baixar empréstimo por devolução - OK
- baixar empréstimo por extravio com reposição - vincular ID do livro cadastrado - ok
- baixar empréstimo por extravio sem reposição com justificativa - OK
- alterar empréstimo - OK
- alterar livro do empréstimo - livro tem que estar disponível - OK: por hora vai ser apenas pelo caso de uso de updateLoan
- event dispatcher para emissão de eventos de domínio do agregado de empréstimo
- exclusão lógica será com deleteAt
- adicionar status no empréstimo de livros - OK
  - confimado
  - devolvido - precisa ter a data de devolução
  - extravio
  - justificativa 
  - cancelado
