#include "client.h"

int main() {
    pthread_t pthread;

    port = SERVER_TCP_PORT;
    host = (char*) "127.0.0.1";

    // Create the socket
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

    // Connecting to the server
    if ( connect( sd, (struct sockaddr*) &server, sizeof( server ) ) == -1 ) {
        fprintf( stderr, "Can't connect to server\n" );
        perror( "connect" );
        exit( 1 );
    }
    pthread_create( &pthread, NULL, myThreadFun, NULL );
    printf( "Connected:    Server Name: %s\n", hp->h_name );
    fflush( stdout );
    pptr = hp->h_addr_list;
    printf( "\t\tIP Address: %s\n", inet_ntop( hp->h_addrtype, *pptr, str, sizeof( str ) ) );
    fflush( stdout );
    while ( 1 ) {
        printf( "Transmit:\n" );
        fflush( stdout );
        //gets(sbuf); // get user's text
        fgets( sbuf, BUFLEN, stdin );

        // Transmit data through the socket
        send( sd, sbuf, BUFLEN, 0 );

//        if ( sbuf[ 0 ] == '~' && sbuf[ 1 ] == '!' )
        if ( sbuf[ 0 ] == 'q' && sbuf[ 1 ] == 'u' && sbuf[ 2 ] == 'i' && sbuf[ 3 ] == 't' )
            break;
    }

    close( sd );
    // client makes repeated calls to recv until no more data is expected to arrive.
    return ( 0 );
}

void* myThreadFun( void* vargp ) {
    int counter = 0;
    while ( 1 ) {
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