int main(){
	char user[24];
	int pemanasan = 0x123;

	printf("kata kata untuk huang : ");
	gets(user);

	if(pemanasan != 0x123){
		win();
	} else {
		printf("lu keren amat bang, kata kata lu %s banget\n", user);
	}
	return 0;
}