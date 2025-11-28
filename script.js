/* ============================================
   نظام إدارة مشتركي عراق ستار - JavaScript احترافي
   ============================================ */

// ============================================
// وظائف عامة
// ============================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
});

// ============================================
// صفحة تسجيل الدخول
// ============================================

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        if (!username || !password) {
            showAlert('يرجى ملء جميع الحقول', 'warning');
            return;
        }
        
        if (username.toLowerCase() === 'admin') {
            showAlert('جاري التحويل إلى لوحة المسؤول...', 'success');
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 1000);
        } else {
            showAlert('جاري التحويل إلى بوابة المشترك...', 'success');
            setTimeout(() => {
                window.location.href = 'user.html';
            }, 1000);
        }
    });
}

// ============================================
// لوحة تحكم المسؤول
// ============================================

const addSubscriberForm = document.getElementById('addSubscriberForm');
if (addSubscriberForm) {
    addSubscriberForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('subName').value.trim();
        const service = document.getElementById('subService').value;
        const expiry = document.getElementById('subExpiry').value;
        const password = document.getElementById('subPassword').value.trim();
        
        if (!name || !service || !expiry || !password) {
            showAlert('يرجى ملء جميع الحقول', 'warning');
            return;
        }
        
        showAlert('تم إضافة المشترك بنجاح: ' + name, 'success');
        closeModal('addSubscriberModal');
        this.reset();
    });
}

const addPaymentForm = document.getElementById('addPaymentForm');
if (addPaymentForm) {
    addPaymentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const subscriber = document.getElementById('paySubscriber').value;
        const amount = document.getElementById('payAmount').value.trim();
        const date = document.getElementById('payDate').value;
        const method = document.getElementById('payMethod').value.trim();
        
        if (!subscriber || !amount || !date || !method) {
            showAlert('يرجى ملء جميع الحقول', 'warning');
            return;
        }
        
        showAlert('تم تسجيل الدفعة بنجاح', 'success');
        closeModal('addPaymentModal');
        this.reset();
    });
}

// ============================================
// بوابة المشترك
// ============================================

const passwordForm = document.querySelector('.modal-body form');
if (passwordForm && window.location.pathname.includes('user')) {
    passwordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const newPassword = document.getElementById('newPassword').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();
        
        if (!newPassword || !confirmPassword) {
            showAlert('يرجى ملء جميع الحقول', 'warning');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showAlert('كلمات المرور غير متطابقة', 'danger');
            return;
        }
        
        if (newPassword.length < 6) {
            showAlert('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'warning');
            return;
        }
        
        showAlert('تم تغيير كلمة المرور بنجاح', 'success');
        closeModal('passwordModal');
        this.reset();
    });
}

// ============================================
// وظائف مساعدة
// ============================================

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `<span>${message}</span>`;
    
    document.body.insertBefore(alertDiv, document.body.firstChild);
    
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.maxWidth = '400px';
    
    setTimeout(() => {
        alertDiv.remove();
    }, 4000);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('خطأ في حفظ البيانات:', error);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('خطأ في استرجاع البيانات:', error);
        return null;
    }
}

// ============================================
// معالجات الأحداث العامة
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة بنجاح');
    
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.hasAttribute('data-modal')) {
                const modalId = this.getAttribute('data-modal');
                if (modalId) {
                    openModal(modalId);
                }
            }
        });
    });
});

window.addEventListener('error', function(event) {
    console.error('حدث خطأ:', event.error);
});
