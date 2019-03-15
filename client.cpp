#include <QDebug>

#include "client.h"

void client() {
    pthread_t pthread;

       port = SERVER_TCP_PORT;
       host = (char*) "127.0.0.1";

       if ( ( sd = socket( AF_INET, SOCK_STREAM, 0 ) ) == -1 ) {
           perror( "Cannot create socket" );
           exit( 1 );
       }

       bzero( (char*) &server_sockaddr, sizeof( struct sockaddr_in ) );
       server_sockaddr.sin_family = AF_INET;
       server_sockaddr.sin_port = htons( port );

       if ( ( hp = gethostbyname( host ) ) == NULL ) {
           fprintf( stderr, "Unknown server address\n" );
           exit( 1 );
       }

       bcopy( hp->h_addr, (char*) &server_sockaddr.sin_addr, hp->h_length );

       if ( connect( sd, (struct sockaddr*) &server_sockaddr, sizeof( server_sockaddr ) ) == -1 ) {
           fprintf( stderr, "Can't connect to server\n" );
           perror( "connect" );
           exit( 1 );
       }

       pthread_create( &pthread, nullptr, client_receive, nullptr );

       printf( "Connected:    Server Name: %s\n", hp->h_name );
       fflush( stdout );

       pptr = hp->h_addr_list;
       printf( "\t\tIP Address: %s\n", inet_ntop( hp->h_addrtype, *pptr, str, sizeof( str ) ) );
       fflush( stdout );

       while ( true ) {
           printf( "Transmit:\n" );
           fflush( stdout );

           fgets( sbuf, BUFLEN, stdin );
           send( sd, sbuf, BUFLEN, 0 );

           if ( sbuf[ 0 ] == 'q' && sbuf[ 1 ] == 'u' && sbuf[ 2 ] == 'i' && sbuf[ 3 ] == 't' )
               break;
       }

       close( sd );
}


void* client_receive( void* ptr ) {
    while ( true ) {
        int n = 0;
        bp = rbuf;
        bytes_to_read = BUFLEN;
        while ( ( n = recv( sd, bp, bytes_to_read, 0 ) ) < BUFLEN ) {
            bp += n;
            bytes_to_read -= n;
        }
        printf( "%s\n", rbuf );
        fflush( stdout );
    }
}
