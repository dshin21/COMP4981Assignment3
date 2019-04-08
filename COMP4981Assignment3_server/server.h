#ifndef COMP4981ASSIGNMENT3_SERVER_HPP
#define COMP4981ASSIGNMENT3_SERVER_HPP

#include <stdio.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <stdlib.h>
#include <strings.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <iostream>

#define SERVER_TCP_PORT 7000
#define BUFLEN 200
#define LISTENQ 5

char client_address_arr[FD_SETSIZE][20];
int client[FD_SETSIZE];
fd_set rset, allset;

int enterServer();

static void SystemFatal(const char *);

void clean(int clientIndex, int closeSockfd);

#endif
