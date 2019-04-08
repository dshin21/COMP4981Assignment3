/*---------------------------------------------------------------------------------------
--	SOURCE FILE:	server.cpp -   A multiplexed TCP echo server program that is used in
--                                 conjunction with a nodejs program.
--
--	PROGRAM:		DChatServer
--
--	FUNCTIONS:		Berkeley Socket API
--
--	DATE:			February 18, 2001
--
--	REVISIONS:		
--				    February 20, 2008
--				        Added a proper read loop
--				        Added REUSEADDR
--				        Added fatal error wrapper function
--                  March 16, 2019
--				        Added printf statements to integrate nodejs program.
--
--	DESIGNERS:		Based on Richard Stevens Example, p165-166
--				    Modified & redesigned: Aman Abdulla: February 16, 2001
--				    Modified & redesigned: Daniel Shin: March 16, 2019
--
--				
--	PROGRAMMER:		Aman Abdulla, Daniel Shin
--
--	NOTES:
--	The program will accept TCP connections from multiple client machines.
-- 	The program will read data from each client socket and simply echo it back.
-- 	The program will also print the newly connected client's id and ip to it's peer clients.
---------------------------------------------------------------------------------------*/

#include "server.h"

int main()
{
    int i, maxi, nready, bytes_to_read, arg;
    int listen_sd, new_sd, sockfd, client_len, port, maxfd;
    struct in_addr sin_addrArr[FD_SETSIZE];
    struct sockaddr_in server, client_addr;
    char *bp, buf[BUFLEN];
    ssize_t n;

    port = SERVER_TCP_PORT;

    if ((listen_sd = socket(AF_INET, SOCK_STREAM, 0)) == -1)
        SystemFatal("Cannot Create Socket!");

    arg = 1;
    if (setsockopt(listen_sd, SOL_SOCKET, SO_REUSEADDR, &arg, sizeof(arg)) == -1)
        SystemFatal("setsockopt");

    bzero((char *)&server, sizeof(struct sockaddr_in));
    server.sin_family = AF_INET;
    server.sin_port = htons(port);
    server.sin_addr.s_addr = htonl(INADDR_ANY);

    if (bind(listen_sd, (struct sockaddr *)&server, sizeof(server)) == -1)
        SystemFatal("bind error");

    listen(listen_sd, LISTENQ);

    maxfd = listen_sd;
    maxi = -1;

    for (i = 0; i < FD_SETSIZE; ++i)
        client[i] = -1;

    FD_ZERO(&allset);
    FD_SET(listen_sd, &allset);

    while (true)
    {
        rset = allset;
        nready = select(maxfd + 1, &rset, nullptr, nullptr, nullptr);

        if (FD_ISSET(listen_sd, &rset))
        {
            client_len = sizeof(client_addr);

            if ((new_sd = accept(listen_sd, (struct sockaddr *)&client_addr, (socklen_t *)&client_len)) == -1)
                SystemFatal("accept error");

            printf(" \nRemote Address:  %s\n", inet_ntoa(client_addr.sin_addr));

            fflush(stdout);

            for (i = 0; i < FD_SETSIZE; i++)
            {
                if (client[i] < 0)
                {
                    client[i] = new_sd;
                    sin_addrArr[i] = client_addr.sin_addr;
                    sscanf(inet_ntoa(client_addr.sin_addr), "%s", client_address_arr[i]);

                    //send new client its id
                    char s_buf[BUFLEN];
                    sprintf(s_buf, "cid:%d", i);
                    write(new_sd, s_buf, BUFLEN);
                    fflush(stdout);
                    break;
                }
            }

            if (i == FD_SETSIZE)
            {
                printf("Too many clients\n");
                exit(1);
            }

            FD_SET(new_sd, &allset);

            if (new_sd > maxfd)
                maxfd = new_sd;
            if (i > maxi)
                maxi = i;
            if (--nready <= 0)
                continue;
        }

        for (i = 0; i <= maxi; i++)
        {
            if ((sockfd = client[i]) < 0)
                continue;

            if (FD_ISSET(sockfd, &rset))
            {
                bp = buf;
                bytes_to_read = BUFLEN;

                while ((n = read(sockfd, bp, bytes_to_read)) > 0)
                {
                    bp += n;
                    bytes_to_read -= n;
                }

                if (buf[0] == 'q' && buf[1] == 'u' && buf[2] == 'i' && buf[3] == 't')
                {
                    std::cout << "client exit";
                    clean(i, sockfd);
                }
                else
                {
                    int currentSockfd = sockfd;
                    int currentIndex = i;

                    fflush(stdout);

                    for (i = 0; i <= maxi; i++)
                    {

                        if ((sockfd = client[i]) < 0 || sockfd == currentSockfd)
                            continue;

                        char tempSendCombine[BUFLEN];
                        sprintf(tempSendCombine, "new_cid:%d\nnew_cip:%s\n%s", currentIndex, client_address_arr[currentIndex],
                                buf);
                        write(sockfd, tempSendCombine, BUFLEN);
                        fflush(stdout);
                    }
                }
                if (--nready <= 0)
                    break;
            }
        }
    }
}

static void SystemFatal(const char *message)
{
    perror(message);
    exit(EXIT_FAILURE);
}

void clean(int clientIndex, int closeSockfd)
{
    printf(" Remote Address:  %s closed connection\n", client_address_arr[clientIndex]);
    fflush(stdout);
    close(closeSockfd);
    FD_CLR(closeSockfd, &allset);
    client[clientIndex] = -1;
}