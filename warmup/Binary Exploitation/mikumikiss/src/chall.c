#include <stdio.h>

void win(){
	printf("CSC{g1l4_s0lv3_b1n3x_s1ap_m3nj4d1_n3xt_m1k1m1ku}");
}

char *gets(char *a);

void init(){
	setvbuf(stdin, NULL, _IONBF, 0);
	setvbuf(stdout, NULL, _IONBF, 0);
}

int main(){
	init();
	char user[24];
	int pemanasan = 0x123;

	printf("kata kata untuk huang : ");
	gets(user);

	if(pemanasan != 0x123){
		win();
	} else {
		printf("lu keren amat bang, kata kata lu %s banget\n", user);
	}
	return 0;
}

