#ifndef COMP4981ASSIGNMENT3_SERVER_HPP
#define COMP4981ASSIGNMENT3_SERVER_HPP

#define SERVER_TCP_PORT 7000    // Default port
#define BUFLEN    200        //Buffer length
#define LISTENQ    5

char client_address_arr[FD_SETSIZE][20];
int client[FD_SETSIZE];
fd_set rset, allset;

int enterServer();

static void SystemFatal( const char* );

void clean( int clientIndex, int closeSockfd );

#endif //COMP4981ASSIGNMENT3_SERVER_HPP
