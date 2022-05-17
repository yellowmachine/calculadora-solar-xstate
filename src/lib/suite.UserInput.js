import { create, test, enforce } from 'vest';

const suite = create((data) => {
  test('yearconsume', 'El consumo anual es obligatorio', () => {
    enforce(data.yearconsume).isNotBlank();
  });

  test('yearconsume', 'El consumo anual debe ser un número', () => {
    enforce(data.yearconsume).isNumber();
  });
});

export default suite;