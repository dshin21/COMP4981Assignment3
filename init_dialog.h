#ifndef INIT_DIALOG_H
#define INIT_DIALOG_H

#include <QDialog>
#include "ui_init_dialog.h"

class init_dialog : public QDialog {
Q_OBJECT
public:
    init_dialog( QDialog* parent = nullptr );

private:
    Ui::init_dialog ui;

signals:

    void signal_isServer();

    void signal_isClient();
};

#endif // INIT_DIALOG_H
