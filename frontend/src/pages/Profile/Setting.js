import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import UserService from '~/services/user.service';
import styles from './Setting.module.scss';
import { useCookies } from 'react-cookie';
import { storage } from '~/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import NotificationService from '~/services/notification.service';
import PermisstionService from '~/services/permission.service';
import NotFound from '~/components/NotFound';
// import { v4 } from 'uuid';

const cx = classNames.bind(styles);

function Setting() {
    const [cookies, setCookie] = useCookies(['email', 'noti']);
    const [messRe, setMessRe] = useState();
    const [messPass, setMessPass] = useState();
    const [active, setActive] = useState('info');
    const [info, setInfo] = useState();
    const [name, setName] = useState();
    const [changeName, setChangeName] = useState(false);
    const [picture, setPicture] = useState();
    const [changePicture, setChangePicture] = useState(false);
    const [currentFile, setCurrentFile] = useState();
    const [message, setMessage] = useState();
    const nameRef = useRef();
    const inputPicture = useRef();

    const [loading, setLoading] = useState(true);
    const [changePass, setChangePass] = useState(false);
    const [passOld, setPassOld] = useState();
    const [passNew, setPassNew] = useState();
    const [passRe, setPassRe] = useState();
    const passOldRef = useRef();
    const passReRef = useRef();
    const [mess, setMess] = useState();
    const [messSuccess, setMessSuccess] = useState();

    useEffect(() => {
        setLoading(true);
        cookies.email &&
            cookies.email.email &&
            (async (e) => {
                await UserService.getInfoByEmail(cookies.email.email)
                    .then((response) => {
                        setInfo(response.data);
                        setName(response.data.name);
                        setPicture(response.data.picture);
                    })
                    .then(() => {
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoading(false);
                    });
            })();
    }, [cookies.email]);

    const handleSaveName = (e) => {
        e.preventDefault();
        if (name) {
            (async (e) => {
                await UserService.updateName(
                    JSON.stringify({
                        email: cookies.email.email,
                        name: name,
                    }),
                )
                    .then((response) => {
                        if (response.data.success) {
                            setCookie('email', response.data, {
                                secure: true,
                                sameSite: 'Strict',
                                path: '/',
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })();
            setChangeName(false);
            (async () => {
                NotificationService.create(
                    JSON.stringify({
                        email: cookies.email.email,
                        content: 'Bạn vừa thay đổi tên hiển thị thành công',
                        type: 'success',
                    }),
                )
                    .then((response) => {
                        setCookie('noti', (pre) => pre + 1, {
                            secure: true,
                            sameSite: 'Strict',
                            path: '/',
                        });
                    })
                    .catch((err) => {});
            })();
        } else setChangeName(false);
    };
    const handleSavePassword = (event) => {
        event.preventDefault();
        (async (e) => {
            await UserService.loginUser(
                JSON.stringify({
                    email: cookies.email.email,
                    pass: passOld,
                }),
            )
                .then((response) => {
                    if (response.data.success) {
                        //Kiểm tra pass mới
                        if (passNew !== passRe) {
                            setMessRe({
                                success: false,
                                message: `Confirm password does not match with New password`,
                            });
                            passReRef.current.focus();
                        } else {
                            (async (e) => {
                                await UserService.updatePass(
                                    JSON.stringify({
                                        email: cookies.email.email,
                                        pass: passNew,
                                    }),
                                )
                                    .then(() => {})
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            })();
                            setChangePass(false);
                            (async () => {
                                NotificationService.create(
                                    JSON.stringify({
                                        email: cookies.email.email,
                                        content: 'Bạn vừa thay đổi Mật khẩu thành công',
                                        type: 'success',
                                    }),
                                )
                                    .then((response) => {
                                        setCookie('noti', (pre) => pre + 1, {
                                            secure: true,
                                            sameSite: 'Strict',
                                            path: '/',
                                        });
                                        setMessSuccess({
                                            success: true,
                                            message: `Change Password Success`,
                                        });
                                    })
                                    .catch((err) => {});
                            })();
                        }
                    } else {
                        setMessPass({ success: false, message: `Old Password not correct!` });
                        passOldRef.current.focus();
                    }
                })
                .catch(() => {
                    setMessPass({ success: false, message: `Old Password not correct!` });
                });
        })();
    };

    const handleSavePicture = () => {
        if (currentFile) {
            var fileName = currentFile.name;
            var idxDot = fileName.lastIndexOf('.') + 1;
            var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
            const imageRef = ref(storage, `avatar/${cookies.email.email + `.${extFile}`}`);
            uploadBytes(imageRef, currentFile).then((e) => {
                getDownloadURL(e.ref).then((url) => {
                    (async (e) => {
                        await UserService.updatePicture(
                            JSON.stringify({
                                email: cookies.email.email,
                                picture: url,
                            }),
                        )
                            .then((response) => {
                                if (response.data.success) {
                                    setCookie('email', response.data, {
                                        secure: true,
                                        sameSite: 'Strict',
                                        path: '/',
                                    });
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    })();
                });
                setChangePicture(false);
                (async () => {
                    NotificationService.create(
                        JSON.stringify({
                            email: cookies.email.email,
                            content: 'Bạn vừa thay đổi ảnh đại diện thành công',
                            type: 'success',
                        }),
                    )
                        .then((response) => {
                            setCookie('noti', (pre) => pre + 1, {
                                secure: true,
                                sameSite: 'Strict',
                                path: '/',
                            });
                        })
                        .catch((err) => {});
                })();
            });
        } else setChangePicture(false);
    };

    //Quên mật khẩu
    const forgotPassword = async (e) => {
        e.preventDefault();
        await UserService.sendPassword(
            JSON.stringify({
                email: cookies.email.email,
            }),
        )
            .then((response) => {
                setMess(response.data);
                (async () => {
                    NotificationService.create(
                        JSON.stringify({
                            email: cookies.email.email,
                            content:
                                'Mật khẩu đăng nhập đã được gửi đến email của bạn. Trong trường hợp không tìm thấy email, hãy kiểm tra thư mục Thư rác.',
                            type: 'info',
                        }),
                    )
                        .then((data) => {
                            setCookie('noti', (pre) => pre + 1, {
                                secure: true,
                                sameSite: 'Strict',
                                path: '/',
                            });
                        })
                        .catch((err) => {});
                })();
            })
            .catch((err) => {
                setMess(err);
            });
    };

    const [changePermission, setChangePermission] = useState(false);
    const [permission, setPermission] = useState();
    const [messPermission, setMessPermission] = useState();
    const permissionRef = useRef();
    const handleSavePermission = (event) => {
        event.preventDefault();
        (async (e) => {
            await PermisstionService.create(
                JSON.stringify({
                    email: cookies.email.email,
                    comment: permission,
                }),
            )
                .then((response) => {
                    if (response.data.success) {
                        setChangePermission(false);
                        (async () => {
                            NotificationService.create(
                                JSON.stringify({
                                    email: cookies.email.email,
                                    content:
                                        'Bạn vừa yêu cầu thay đổi quyền người dùng thành công. Hãy đợi hệ thống xác nhận trong thời gian sớm nhất',
                                    type: 'success',
                                }),
                            )
                                .then((response) => {
                                    setCookie('noti', (pre) => pre + 1, {
                                        secure: true,
                                        sameSite: 'Strict',
                                        path: '/',
                                    });
                                })
                                .catch((err) => {});
                        })();
                        setMessPermission(response.data);
                        setPermission();
                    } else {
                        setMessPermission(response.data);
                        setPermission();
                        setChangePermission(false);
                    }
                })
                .catch((err) => {
                    setMessPermission(err);
                    setChangePermission(false);
                    setPermission();
                });
        })();
    };

    return (
        <div className={cx('content')}>
            {info ? (
                <div className={cx('card')} data-state="#info">
                    <div className={cx('card-header')}>
                        <div
                            className={cx('card-cover')}
                            style={{
                                backgroundImage: `url('${info.picture}')`,
                            }}
                        ></div>
                        <img className={cx('card-avatar')} src={info.picture} alt="avatar" />
                        <h1 className={cx('card-fullname')}>{info.name}</h1>
                    </div>
                    <div className={cx('card-main')}>
                        <div className={cx('card-nav')}>
                            <div className={cx('card-buttons')}>
                                <button
                                    className={cx(active === 'info' && 'is-active')}
                                    onClick={() => setActive('info')}
                                >
                                    INFO
                                </button>
                                <button
                                    className={cx(active === 'pass' && 'is-active')}
                                    onClick={() => setActive('pass')}
                                >
                                    PASSWORD
                                </button>
                                <button
                                    className={cx(active === 'permission' && 'is-active')}
                                    onClick={() => setActive('permission')}
                                >
                                    PERMISSION
                                </button>
                            </div>
                        </div>
                        <div className={cx('card-nav-item')}>
                            <div className={cx('card-section', active === 'info' && 'is-active')}>
                                <div className={cx('card-content')}>
                                    <div className={cx('card-subtitle')}>INFO</div>
                                    <div className={cx('label', 'first')}>
                                        <div className={cx('title')}>Email</div>
                                    </div>
                                    <div className={cx('infomation')}> {info.email}</div>
                                    <form action="#" method="POST" onSubmit={handleSaveName}>
                                        <div className={cx('label')}>
                                            <div className={cx('title')}>Name</div>
                                            {changeName ? (
                                                <div className={cx('button-group')}>
                                                    <button
                                                        type="submit"
                                                        className={cx('button', 'button-save')}
                                                    >
                                                        Save
                                                    </button>
                                                    <div
                                                        className={cx('button', 'button-cancel')}
                                                        onClick={() => {
                                                            setChangeName(false);
                                                            setName(info.name);
                                                        }}
                                                    >
                                                        Cancel
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    className={cx('button', 'button-update')}
                                                    onClick={() => {
                                                        Promise.resolve()
                                                            .then(() => {
                                                                setChangeName(true);
                                                            })
                                                            .then(() => {
                                                                nameRef.current.focus();
                                                            })
                                                            .catch((err) => {
                                                                console.log(err);
                                                            });
                                                    }}
                                                >
                                                    Edit
                                                </div>
                                            )}
                                        </div>
                                        <input
                                            className={cx('input', 'infomation')}
                                            value={name}
                                            required
                                            placeholder="Enter your name..."
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                            disabled={!changeName}
                                            spellCheck="false"
                                            ref={nameRef}
                                        />
                                    </form>
                                    <div className={cx('label')}>
                                        <div className={cx('title')}>Avatar</div>
                                        {changePicture ? (
                                            <div className={cx('button-group')}>
                                                <div
                                                    className={cx('button', 'button-save')}
                                                    onClick={handleSavePicture}
                                                >
                                                    Save
                                                </div>
                                                <div
                                                    className={cx('button', 'button-cancel')}
                                                    onClick={() => {
                                                        setChangePicture(false);
                                                        setPicture(info.picture);
                                                    }}
                                                >
                                                    Cancel
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className={cx('button', 'button-update')}
                                                onClick={() => {
                                                    setChangePicture(true);
                                                }}
                                            >
                                                Edit
                                            </div>
                                        )}
                                    </div>
                                    <div className={cx('infomation')}>
                                        <div className={cx('avatar-change')}>
                                            <img
                                                className={cx('avatar-picture')}
                                                src={picture}
                                                alt="avatar"
                                            />
                                            {changePicture && (
                                                <div
                                                    className={cx('avatar-choice')}
                                                    onClick={(event) => {
                                                        setMessage();
                                                        inputPicture.current.click();
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faCamera}
                                                        className={cx('camera')}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        {changePicture && (
                                            <>
                                                {message ? (
                                                    <div className={cx('avatar-warning', 'error')}>
                                                        {message}
                                                    </div>
                                                ) : (
                                                    <div className={cx('avatar-warning')}>
                                                        {`Should be a square image, accepting files: JPG, PNG or
                                          GIF and Size < 500KB.`}
                                                    </div>
                                                )}
                                                <input
                                                    ref={inputPicture}
                                                    className={cx('avatar-input')}
                                                    type="file"
                                                    name="myImage"
                                                    accept="image/jpeg, image/png, image/gif"
                                                    onChange={(event) => {
                                                        var fileName = event.target.files[0].name;
                                                        var idxDot = fileName.lastIndexOf('.') + 1;
                                                        var extFile = fileName
                                                            .substr(idxDot, fileName.length)
                                                            .toLowerCase();
                                                        if (
                                                            extFile === 'jpg' ||
                                                            extFile === 'gif' ||
                                                            extFile === 'png' ||
                                                            extFile === 'jfif' ||
                                                            extFile === 'pjpeg' ||
                                                            extFile === 'jpeg' ||
                                                            extFile === 'pjp'
                                                        ) {
                                                            if (event.target.files[0].size < 500000) {
                                                                setMessage();
                                                                setCurrentFile(event.target.files[0]);
                                                                setPicture(
                                                                    URL.createObjectURL(
                                                                        event.target.files[0],
                                                                    ),
                                                                );
                                                            } else {
                                                                setMessage('Size image too large!');
                                                            }
                                                        } else {
                                                            setMessage(
                                                                'Only JPG, PNG and GIF file are allowed!',
                                                            );
                                                        }
                                                    }}
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('card-section', active === 'pass' && 'is-active')}>
                                <div className={cx('card-content')}>
                                    <div className={cx('card-subtitle')}>PASSWORD</div>
                                    <form action="#" method="POST" onSubmit={handleSavePassword}>
                                        {!changePass && (
                                            <>
                                                <div className={cx('label')}>
                                                    <div className={cx('title')}>Change Password</div>
                                                    <div
                                                        className={cx('button', 'button-update')}
                                                        onClick={() => {
                                                            Promise.resolve()
                                                                .then(() => {
                                                                    setChangePass(true);
                                                                    setMessSuccess();
                                                                })
                                                                .then(() => {
                                                                    passOldRef.current.focus();
                                                                })
                                                                .catch((err) => {
                                                                    console.log(err);
                                                                });
                                                        }}
                                                    >
                                                        Edit
                                                    </div>
                                                </div>
                                                {messSuccess && (
                                                    <div
                                                        className={cx(
                                                            'message-item',
                                                            messSuccess.success ? 'success' : 'failed',
                                                        )}
                                                        dangerouslySetInnerHTML={{
                                                            __html: messSuccess.message,
                                                        }}
                                                    ></div>
                                                )}
                                            </>
                                        )}
                                        {changePass && (
                                            <>
                                                <div className={cx('label', 'first')}>
                                                    <div className={cx('title')}>Enter old password</div>
                                                </div>
                                                <input
                                                    className={cx('input', 'infomation')}
                                                    value={passOld}
                                                    placeholder="Enter old password..."
                                                    required
                                                    autoComplete="off"
                                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                                    minLength={8}
                                                    title="Mật khẩu phải có ít nhất một chữ số, một chữ cái in hoa, một chữ cái in thường và từ 8 kí tự trở lên"
                                                    type="password"
                                                    onChange={(e) => {
                                                        setPassOld(e.target.value);
                                                        setMessPass();
                                                        setMess();
                                                    }}
                                                    spellCheck="false"
                                                    ref={passOldRef}
                                                />
                                                {messPass && (
                                                    <div
                                                        className={cx(
                                                            'message-item',
                                                            messPass.success ? 'success' : 'failed',
                                                        )}
                                                        dangerouslySetInnerHTML={{
                                                            __html: messPass.message,
                                                        }}
                                                    ></div>
                                                )}
                                                <div className={cx('label')}>
                                                    <div className={cx('title')}>Enter new password</div>
                                                </div>
                                                <input
                                                    className={cx('input', 'infomation')}
                                                    value={passNew}
                                                    required
                                                    placeholder="Enter new password..."
                                                    autoComplete="off"
                                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                                    minLength={8}
                                                    title="Mật khẩu phải có ít nhất một chữ số, một chữ cái in hoa, một chữ cái in thường và từ 8 kí tự trở lên"
                                                    type="password"
                                                    onChange={(e) => {
                                                        setPassNew(e.target.value);
                                                        setMessRe();
                                                        setMess();
                                                    }}
                                                    spellCheck="false"
                                                />
                                                <div className={cx('label')}>
                                                    <div className={cx('title')}>
                                                        Confirm new password
                                                    </div>
                                                </div>
                                                <input
                                                    className={cx('input', 'infomation')}
                                                    value={passRe}
                                                    type="password"
                                                    autoComplete="off"
                                                    required
                                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                                    minLength={8}
                                                    placeholder="Confirm new password..."
                                                    title="Mật khẩu phải có ít nhất một chữ số, một chữ cái in hoa, một chữ cái in thường và từ 8 kí tự trở lên"
                                                    onChange={(e) => {
                                                        setPassRe(e.target.value);
                                                        setMess();
                                                        setMessRe();
                                                    }}
                                                    spellCheck="false"
                                                    ref={passReRef}
                                                />
                                                {messRe && (
                                                    <div
                                                        className={cx(
                                                            'message-item',
                                                            messRe.success ? 'success' : 'failed',
                                                        )}
                                                        dangerouslySetInnerHTML={{
                                                            __html: messRe.message,
                                                        }}
                                                    ></div>
                                                )}
                                                <div className={cx('button-group-pass')}>
                                                    <button
                                                        type="submit"
                                                        className={cx('button', 'button-save')}
                                                    >
                                                        Save
                                                    </button>
                                                    <div
                                                        className={cx('button', 'button-cancel')}
                                                        onClick={() => {
                                                            setChangePass(false);
                                                            setPassNew();
                                                            setPassOld();
                                                            setPassRe();
                                                        }}
                                                    >
                                                        Cancel
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </form>
                                    {changePass && (
                                        <div className={cx('forgotPassword')} onClick={forgotPassword}>
                                            <span className={cx('forgottext')}>Forgot password?</span>
                                        </div>
                                    )}
                                    {mess && (
                                        <div
                                            className={cx(
                                                'message',
                                                mess.success ? 'success' : 'failed',
                                            )}
                                            dangerouslySetInnerHTML={{ __html: mess.message }}
                                        ></div>
                                    )}
                                </div>
                            </div>
                            <div className={cx('card-section', active === 'permission' && 'is-active')}>
                                <div className={cx('card-content')}>
                                    <div className={cx('card-subtitle')}>PERMISSION</div>
                                    {cookies.email.permission === 'user' ? (
                                        <>
                                            <div className={cx('label')}>
                                                <div className={cx('title')}>
                                                    If you are a teacher, you can post articles and tests
                                                    on the system.
                                                </div>
                                            </div>
                                            <form
                                                action="#"
                                                method="POST"
                                                onSubmit={handleSavePermission}
                                            >
                                                {!changePermission && (
                                                    <>
                                                        <div className={cx('label')}>
                                                            <div className={cx('title')}>
                                                                Grant permission
                                                            </div>
                                                            <div
                                                                className={cx('button', 'button-update')}
                                                                onClick={() => {
                                                                    Promise.resolve()
                                                                        .then(() => {
                                                                            setChangePermission(true);
                                                                            setMessPermission();
                                                                        })
                                                                        .then(() => {
                                                                            permissionRef.current.focus();
                                                                        })
                                                                        .catch((err) => {
                                                                            console.log(err);
                                                                        });
                                                                }}
                                                            >
                                                                Request
                                                            </div>
                                                        </div>
                                                        {messPermission && (
                                                            <div
                                                                className={cx(
                                                                    'message',
                                                                    messPermission.success
                                                                        ? 'success'
                                                                        : 'failed',
                                                                )}
                                                                dangerouslySetInnerHTML={{
                                                                    __html: messPermission.message,
                                                                }}
                                                            ></div>
                                                        )}
                                                    </>
                                                )}
                                                {changePermission && (
                                                    <>
                                                        <div className={cx('label', 'first')}>
                                                            <div className={cx('title')}>Suggestion</div>
                                                        </div>
                                                        <textarea
                                                            className={cx('input', 'infomation')}
                                                            value={permission}
                                                            rows={4}
                                                            placeholder="Your suggestion..."
                                                            required
                                                            onChange={(e) => {
                                                                setPermission(e.target.value);
                                                            }}
                                                            spellCheck="false"
                                                            ref={permissionRef}
                                                        ></textarea>
                                                        <div className={cx('button-group-pass')}>
                                                            <button
                                                                type="submit"
                                                                className={cx('button', 'button-save')}
                                                            >
                                                                Save
                                                            </button>
                                                            <div
                                                                className={cx('button', 'button-cancel')}
                                                                onClick={() => {
                                                                    setChangePermission(false);
                                                                    setPermission();
                                                                }}
                                                            >
                                                                Cancel
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </form>
                                        </>
                                    ) : (
                                        <div className={cx('label')}>
                                            <div className={cx('title')}>
                                                You can post articles and tests on the system.
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                !loading && <NotFound />
            )}
        </div>
    );
}

export default Setting;
