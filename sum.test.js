const sum = require('./sum')

test('testa a funcao sum', () => {
    const resultado = sum(4, 6)
    expect(resultado).toBe(10)
})