#include "client.h"

int main( int argc, const char* argv[] ) {
    pthread_t pthread;

    host = (char*) argv[ 1 ];
    port = atoi( argv[ 2 ] );

    if ( ( sd = socket( AF_INET, SOCK_STREAM, 0 ) ) == -1 ) {
        perror( "Cannot create socket" );
        exit( 1 );
    }

    bzero( (char*) &server, sizeof( struct sockaddr_in ) );
    server.sin_family = AF_INET;
    server.sin_port = htons( port );

    if ( ( hp = gethostbyname( host ) ) == NULL ) {
        fprintf( stderr, "Unknown server address\n" );
        exit( 1 );
    }

    bcopy( hp->h_addr, (char*) &server.sin_addr, hp->h_length );

    if ( connect( sd, (struct sockaddr*) &server, sizeof( server ) ) == -1 ) {
        fprintf( stderr, "Can't connect to server\n" );
        perror( "connect" );
        exit( 1 );
    }

    pthread_create( &pthread, nullptr, client_receive, nullptr );

    pptr = hp->h_addr_list;

    printf( "s_ip: %s\n", inet_ntop( hp->h_addrtype, *pptr, str, sizeof( str ) ) );
    printf( "s_port %d\n", port );

    fflush( stdout );

    while ( true ) {
        fflush( stdout );

        fgets( sbuf, BUFLEN, stdin );
        send( sd, sbuf, BUFLEN, 0 );

        if ( sbuf[ 0 ] == 'q' && sbuf[ 1 ] == 'u' && sbuf[ 2 ] == 'i' && sbuf[ 3 ] == 't' )
            break;
    }

    close( sd );
    return ( 0 );
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