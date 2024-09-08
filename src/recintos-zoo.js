class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: 3, especie: 'MACACO' },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: 0, especie: null },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: 1, especie: 'GAZELA' },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: 0, especie: null },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: 1, especie: 'LEAO' }
        ];

        this.animais = {
            LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana e rio'], carnivoro: false }
        };
    }

    analisaRecintos(nomeAnimal, quantidade) {
        const animal = this.animais[nomeAnimal.toUpperCase()];

        if (!animal) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }
        if (quantidade <= 0 || isNaN(quantidade)) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }

        const recintosViaveis = this.recintos
            .filter(recinto => this.recintoEhViavel(recinto, animal, quantidade))
            .sort((a, b) => a.numero - b.numero)  // Ordenar por número do recinto
            .map(recinto => this.formatarRecinto(recinto, animal, quantidade));

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: null };
        }

        return { erro: null, recintosViaveis };
    }

    recintoEhViavel(recinto, animal, quantidade) {
        const espacoOcupadoExistente = recinto.animaisExistentes > 0
            ? recinto.animaisExistentes * this.animais[recinto.especie]?.tamanho || 0
            : 0;
        const espacoNecessario = quantidade * animal.tamanho;
        const espacoLivre = recinto.tamanhoTotal - espacoOcupadoExistente;

        const biomaAdequado = animal.bioma.some(b => recinto.bioma.includes(b));
        const espacoSuficiente = espacoLivre >= espacoNecessario;

        const especieExistente = recinto.especie ? this.animais[recinto.especie] : null;
        const especiesCompativeis = !especieExistente || (especieExistente.carnivoro === animal.carnivoro);

        return biomaAdequado && espacoSuficiente && especiesCompativeis;
    }

    formatarRecinto(recinto, animal, quantidade) {
        const espacoOcupadoExistente = recinto.animaisExistentes > 0
            ? recinto.animaisExistentes * this.animais[recinto.especie]?.tamanho || 0
            : 0;
        const espacoNecessario = quantidade * animal.tamanho;
      
        const espacoExtra = (recinto.especie && this.animais[recinto.especie]?.tamanho !== animal.tamanho) ? 1 : 0;
      
        const espacoTotalUsado = espacoOcupadoExistente + espacoNecessario + espacoExtra;
       
        const espacoLivre = recinto.tamanhoTotal - espacoTotalUsado;

        return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
    }
}

const zoo = new RecintosZoo();
const resultado = zoo.analisaRecintos("HIPOPOTAMO", 5);
console.log(resultado);

export {RecintosZoo};
