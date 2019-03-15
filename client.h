#ifndef CLIENT_H
#define CLIENT_H

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

static int n, bytes_to_read;
static int sd, port;
static struct hostent* hp;
static struct sockaddr_in server_sockaddr;
static char* host, * bp, rbuf[BUFLEN], sbuf[BUFLEN], ** pptr;
static char str[16];

void client();

void* client_receive( void* ptr );


#endif // CLIENT_H
