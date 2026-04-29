#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void win() {
    puts("            .                                       ,");
    puts("            )).               -===-               ,((");
    puts("            ))).                                 ,(((");
    puts("            ))))).            .:::.            ,((((((");
    puts("            ))))))))).        :. .:        ,(((((((('");
    puts("            `))))))))))).     : - :    ,((((((((((((");
    puts("             ))))))))))))))))_:' ':_((((((((((((((('");
    puts("             `)))))))))))).-' \\___/ '-._(((((((((((");
    puts("              `))))_._.-' __)(     )(_  '-._._(((('        CSC{Cuma_sawit_tiada_yang_lain.Soal_rakyat_emang_gua_pikirin?Biarin_senegara_pada_nyinyir.Yang_penting_duit_gua_masih_ngalir}");
    puts("               `))'---)___)))'\\_ _/'((((__(---'(('");
    puts("                  `))))))))))))|' '|(((((((((((('");
    puts("HIDUP JOKOWIIIIIII `)))))))))/'   '\\((((((((('");
    puts("                     `)))))))|     |((((((('");
    puts("                      `))))))|     |(((((('");
    puts("                            /'     '\\");
    puts("                           /'       '\\");
    puts("                          /'         '\\");
    puts("                         /'           '\\");
    puts("                         '---..___..---'");
}

int main() {
    setvbuf(stdout, NULL, _IONBF, 0); 
    setvbuf(stdin, NULL, _IONBF, 0);

    struct {
        char KenapaadarakyatdiantarakaudanakuDiantarakudansawitDiantarakudansawitDiantarakudansawituhDiantarakudansawitDiantarakudansawit[1000];
        char gacorking[8];
        int sawit;
    } data;
    
    data.sawit = 0;
    strcpy(data.gacorking, "SAWIT"); 

    printf("Hidup apa bang?\n");
    printf("HIDUP : ");
    
    gets(data.KenapaadarakyatdiantarakaudanakuDiantarakudansawitDiantarakudansawitDiantarakudansawituhDiantarakudansawitDiantarakudansawit); 

    if (strcmp(data.gacorking, "SAWIT") != 0) {
        printf("Lu tuh GaDiajak!\n");
        exit(0);
    }

    if (data.sawit == 0x1337) {
        win();
    } else {
        printf("Lu tuh GaDiajak.\n");
    }
    
    return 0;
}
