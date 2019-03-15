#ifndef COMP4981ASSIGNMENT3_CLIENT_CLIENT_HPP
#define COMP4981ASSIGNMENT3_CLIENT_CLIENT_HPP

#include <stdio.h>
#include <netdb.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <errno.h>
#include <stdlib.h>
#include <strings.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <pthread.h>

#define SERVER_TCP_PORT 7000
#define BUFLEN 200

int n, bytes_to_read;
int sd, port;
struct hostent* hp;
struct sockaddr_in server;
char* host, * bp, rbuf[BUFLEN], sbuf[BUFLEN], ** pptr;
char str[16];

void* client_receive( void* ptr );

#endif //COMP4981ASSIGNMENT3_CLIENT_CLIENT_HPP
