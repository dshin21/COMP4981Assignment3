#ifndef SERVER_H
#define SERVER_H

#include <stdio.h>
#include <sys/select.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <stdlib.h>
#include <strings.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <iostream>

#define SERVER_TCP_PORT 7000    // Default port
#define BUFLEN    200        //Buffer length
#define LISTENQ    5

static char client_address_arr[FD_SETSIZE][20];
static int client[FD_SETSIZE];
static fd_set rset, allset;

void server();

static void SystemFatal( const char* );

void clean( int clientIndex, int closeSockfd );

#endif // SERVER_H
