#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

#include "init_dialog.h"

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private:
    Ui::MainWindow *ui;
    init_dialog *i_dialog;
    bool isServer;
    bool isClient;

    void start();

public slots:
    void slot_isServer();
    void slot_isClient();
};

#endif // MAINWINDOW_H
