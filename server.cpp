#include <stdio.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <stdlib.h>
#include <strings.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <iostream>

#include "server.h"

int main() {
    int i, maxi, nready, bytes_to_read, arg;
    int listen_sd, new_sd, sockfd, client_len, port, maxfd;
    struct in_addr sin_addrArr[FD_SETSIZE];
    struct sockaddr_in server, client_addr;
    char* bp, buf[BUFLEN];
    ssize_t n;

    port = SERVER_TCP_PORT;

    if ( ( listen_sd = socket( AF_INET, SOCK_STREAM, 0 ) ) == -1 )
        SystemFatal( "Cannot Create Socket!" );

    arg = 1;
    if ( setsockopt( listen_sd, SOL_SOCKET, SO_REUSEADDR, &arg, sizeof( arg ) ) == -1 )
        SystemFatal( "setsockopt" );

    bzero( (char*) &server, sizeof( struct sockaddr_in ) );
    server.sin_family = AF_INET;
    server.sin_port = htons( port );
    server.sin_addr.s_addr = htonl( INADDR_ANY );

    if ( bind( listen_sd, (struct sockaddr*) &server, sizeof( server ) ) == -1 )
        SystemFatal( "bind error" );

    listen( listen_sd, LISTENQ );

    maxfd = listen_sd;
    maxi = -1;

    for ( i = 0; i < FD_SETSIZE; ++i ) client[ i ] = -1;

    FD_ZERO( &allset );
    FD_SET( listen_sd, &allset );

    while ( true ) {
        rset = allset;
        nready = select( maxfd + 1, &rset, nullptr, nullptr, nullptr );

        if ( FD_ISSET( listen_sd, &rset ) ) {
            client_len = sizeof( client_addr );

            if ( ( new_sd = accept( listen_sd, (struct sockaddr*) &client_addr, (socklen_t*) &client_len ) ) == -1 )
                SystemFatal( "accept error" );

            printf( " \nRemote Address:  %s\n", inet_ntoa( client_addr.sin_addr ) );
            fflush( stdout );

            for ( i = 0; i < FD_SETSIZE; i++ ) {
                if ( client[ i ] < 0 ) {
                    client[ i ] = new_sd;
                    sin_addrArr[ i ] = client_addr.sin_addr;// here
                    sscanf( inet_ntoa( client_addr.sin_addr ), "%s", client_address_arr[ i ] );// here
                    break;
                }
            }

            if ( i == FD_SETSIZE ) {
                printf( "Too many clients\n" );
                exit( 1 );
            }

            FD_SET ( new_sd, &allset );

            if ( new_sd > maxfd ) maxfd = new_sd;
            if ( i > maxi ) maxi = i;
            if ( --nready <= 0 ) continue;
        }

        for ( i = 0; i <= maxi; i++ ) {
            if ( ( sockfd = client[ i ] ) < 0 ) continue;

            if ( FD_ISSET( sockfd, &rset ) ) {
                bp = buf;
                bytes_to_read = BUFLEN;

                while ( ( n = read( sockfd, bp, bytes_to_read ) ) > 0 ) {
                    bp += n;
                    bytes_to_read -= n;
                }

                if ( buf[ 0 ] == 'q' && buf[ 1 ] == 'u' && buf[ 2 ] == 'i' && buf[ 3 ] == 't' ) { // here
                    std::cout << "client exit";
                    clean( i, sockfd );
                } else {
                    int currentSockfd = sockfd;
                    int currentIndex = i;

//                    printf( "client# %d IP:%s message:\t\t%s\r\n", currentIndex, client_address_arr[ currentIndex ],
//                            buf );
                    fflush( stdout );

                    for ( i = 0; i <= maxi; i++ ) {
                        if ( ( sockfd = client[ i ] ) < 0 || sockfd == currentSockfd ) continue;

                        char tempSendCombine[BUFLEN];
                        sprintf( tempSendCombine, "%d::::%s:::%s", currentIndex, client_address_arr[ currentIndex ],
                                 buf );
                        write( sockfd, tempSendCombine, BUFLEN );
                    }
                }
                if ( --nready <= 0 ) break;
            }
        }
    }
}

static void SystemFatal( const char* message ) {
    perror( message );
    exit( EXIT_FAILURE );
}

void clean( int clientIndex, int closeSockfd ) {
    printf( " Remote Address:  %s closed connection\n", client_address_arr[ clientIndex ] );
    fflush( stdout );
    close( closeSockfd );
    FD_CLR( closeSockfd, &allset );
    client[ clientIndex ] = -1;
}