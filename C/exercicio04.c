#include <stdio.h>

int main() {
    // Tamanho do tabuleiro (exemplo 5x5)
    int linhas = 10;
    int colunas = 10;

    // Criação do tabuleiro como uma matriz 10x10
    int tabuleiro[10][10] = {0};  // Inicializa tudo com 0 (vazio)

    // 🚢 Navio 1 - Vertical (3 partes)
    int navio1_x = 1;  // coluna fixa
    int navio1_y_inicio = 0;  // linha inicial

    // Posicionando o navio vertical
    for (int i = 0; i < 3; i++) {
        tabuleiro[navio1_y_inicio + i][navio1_x] = 1;
    }

    // 🚢 Navio 2 - Horizontal (4 partes)
    int navio2_y = 3;  // linha fixa
    int navio2_x_inicio = 0;  // coluna inicial

    // Posicionando o navio horizontal
    for (int j = 0; j < 4; j++) {
        tabuleiro[navio2_y][navio2_x_inicio + j] = 2;
    }

    // 🖥️ Exibir as coordenadas dos navios
    printf("=== Coordenadas dos Navios ===\n");

    // Exibe navio 1 (vertical)
    printf("Navio 1 (Vertical):\n");
    for (int i = 0; i < 3; i++) {
        printf("Parte %d -> (%d, %d)\n", i + 1, navio1_y_inicio + i, navio1_x);
    }

    // Exibe navio 2 (horizontal)
    printf("\nNavio 2 (Horizontal):\n");
    for (int j = 0; j < 4; j++) {
        printf("Parte %d -> (%d, %d)\n", j + 1, navio2_y, navio2_x_inicio + j);
    }

    // (Opcional) Mostrar tabuleiro visualmente
    printf("\n=== Tabuleiro ===\n");
    for (int i = 0; i < linhas; i++) {
        for (int j = 0; j < colunas; j++) {
            printf("%d ", tabuleiro[i][j]);
        }
        printf("\n");
    }

    return 0;
}
