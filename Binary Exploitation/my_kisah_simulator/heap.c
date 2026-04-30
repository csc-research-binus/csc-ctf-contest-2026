
#include<stdio.h>
#include<stdlib.h>
#include<string.h>

struct oshi{
    char name[102];
    int age;
};

struct oshi *my_kisah[10];
void (*free_hook)(char *) = (void (*)(char *))free;
char hook_pad[0x100];
static void setup(void) {
    setvbuf(stdin, NULL, _IONBF, 0);
    setvbuf(stdout, NULL, _IONBF, 0);
    setvbuf(stderr, NULL, _IONBF, 0);
}
void make(){
    
    int idx,size;
    int age;
    char names[102];
    memset(names, 0, sizeof(names));
    printf("index: ");
    scanf("%d", &idx);getchar();
    printf("length: ");
    scanf("%d", &size);getchar();
    if (idx >= 0 && idx < 10) { 
        my_kisah [idx] =  malloc(size);
        printf("name?\n");
        fgets(names, sizeof(names),stdin);
        names[strcspn(names, "\n")] = '\0'; 
        printf("age?\n");
        scanf("%d", &age);
        
        if (age < 18){
            printf("maksudnya apa ya bang????\n");
        }
        else{
            my_kisah[idx]->age = age;
            memcpy(my_kisah[idx]->name, names, 100);
            printf("[+] Note %d dialokasikan.\n", idx);
        }
    }
}

void greet(){
    int idx;
    printf("index: ");
    scanf("%d", &idx);
    getchar();
    
    if (idx >= 0 && idx < 10 && my_kisah[idx] != NULL) {

        printf("sepertinya %s capek, mending pulang!\n", my_kisah[idx]->name);
    } else {
        printf("[-] my_kisah tidak ditemukan.\n");
    }
}

void tinggalin() {
    int idx;
    printf("index: ");
    scanf("%d", &idx);
    getchar();
    
    if (idx >= 0 && idx < 10 && my_kisah[idx] != NULL) {
        free_hook((char *)my_kisah[idx]);
        printf("[*] Kamu telah meninggalkan my_kisah %d (Masuk bin!).\n", idx);
        

    } else {
        printf("[-] my_kisah tidak ditemukan atau sudah pergi.\n");
    }
}

void edit() {
    int idx;
    char names[102];
    printf("index: ");
    scanf("%d", &idx);
    getchar();
    
    
    if (idx >= 0 && idx < 10 && my_kisah[idx] != NULL) {
        printf("new name?\n");
        read(0, names, 100);
        memcpy(my_kisah[idx]->name, names, 100);
    }
}

void vuln() {
    int choose;
    while(1) {
        printf("\n--- my_kisah_simulator ---\n");
        printf("1. my_kisah information\n");
        printf("2. tinggalin my_kisah\n");
        printf("3. greet my_kisah\n");
        printf("4. edit\n");
        printf("5. exit\n");
        printf("choose: ");
        
        if (scanf("%d", &choose) != 1) {
            exit(0);
        }
        getchar();
        
        switch (choose) {
            case 1:
                make();
                break;
            case 2:
                tinggalin();
                break;
            case 3:
                greet();
                break;
            case 4:
                edit();
                break;
            case 5:
                printf("when yahhh~\n");
                exit(0);
            default:
                printf("yang bener dong milihnya.\n");
        } 
    }
}


int main(){
    setup();
    vuln();

    return 0;
}