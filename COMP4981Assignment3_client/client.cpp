/*---------------------------------------------------------------------------------------
--	SOURCE FILE:	client.cpp - A simple TCP client program.
--
--	PROGRAM:		DChatClient
--
--	FUNCTIONS:		Berkeley Socket API
--
--	DATE:			February 2, 2008
--
--	REVISIONS:		
--				    January 2005:
--			    	    Modified the read loop to use fgets.
--  			    	While loop is based on the buffer length 
--			    	March 2019:
--			    	    Refactored into cpp.
--			    	    Added a thread to print to stdout for nodejs program.
--
--
--	DESIGNERS:		Aman Abdulla, Daniel Shin
--
--	PROGRAMMERS:	Aman Abdulla, Daniel Shin
--
--	NOTES:
--	        The program will establish a TCP connection to a user specifed server.
--          The server can be specified using a fully qualified domain name or and
--	        IP address. After the connection has been established the user will be
--          prompted to enter a message. The message string is then sent to the server
--          and the message will be sent to it's peer clients.
---------------------------------------------------------------------------------------*/
#include "client.h"

int main(int argc, const char *argv[])
{
    pthread_t pthread;

    host = (char *)argv[1];
    port = atoi(argv[2]);

    if ((sd = socket(AF_INET, SOCK_STREAM, 0)) == -1)
    {
        perror("Cannot create socket");
        exit(1);
    }

    bzero((char *)&server, sizeof(struct sockaddr_in));
    server.sin_family = AF_INET;
    server.sin_port = htons(port);

    if ((hp = gethostbyname(host)) == NULL)
    {
        fprintf(stderr, "Unknown server address\n");
        exit(1);
    }

    bcopy(hp->h_addr, (char *)&server.sin_addr, hp->h_length);

    if (connect(sd, (struct sockaddr *)&server, sizeof(server)) == -1)
    {
        fprintf(stderr, "Can't connect to server\n");
        perror("connect");
        exit(1);
    }

    pthread_create(&pthread, nullptr, client_receive, nullptr);

    pptr = hp->h_addr_list;

    printf("s_ip:%s\n", inet_ntop(hp->h_addrtype, *pptr, str, sizeof(str)));
    printf("s_port:%d\n", port);
    fflush(stdout);

    while (true)
    {
        fflush(stdout);
        fgets(sbuf, BUFLEN, stdin);
        send(sd, sbuf, BUFLEN, 0);

        if (sbuf[0] == 'q' && sbuf[1] == 'u' && sbuf[2] == 'i' && sbuf[3] == 't')
            break;
    }

    close(sd);
    return (0);
}

/*------------------------------------------------------------------------------------------------------------------
-- FUNCTION:    client_receive
--
-- DATE:        Mar.25, 2019
--
-- DESIGNER:    Daniel Shin
--
-- PROGRAMMER:  Daniel Shin
--
-- INTERFACE:   void *client_receive(void *ptr)
--
-- RETURNS:     void
--
-- NOTES:
--              This function runs on a seperate thread to read mesages sent from the server from stdout and
--              prints it to this client's stdout for the nodejs program to utilize.
----------------------------------------------------------------------------------------------------------------------*/
void *client_receive(void *ptr)
{
    while (true)
    {
        fflush(stdout);
        int n = 0;
        bp = rbuf;
        bytes_to_read = BUFLEN;
        while ((n = recv(sd, bp, bytes_to_read, 0)) < BUFLEN)
        {
            bp += n;
            bytes_to_read -= n;
        }
        printf("%s\n", rbuf);
        fflush(stdout);
    }
}