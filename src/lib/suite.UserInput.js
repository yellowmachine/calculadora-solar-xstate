import { create, test, enforce } from 'vest';

const suite = create((data) => {
  test('yearconsume', 'El consumo anual es obligatorio', () => {
    enforce(data.yearconsume).isNotBlank();
  });

  test('yearconsume', 'El consumo anual debe ser un número', () => {
    enforce(data.yearconsume).isNumber();
  });

  test('power', 'La potencia es obligatoria', () => {
    enforce(data.power).isNotBlank();
  });

});

export default suite;