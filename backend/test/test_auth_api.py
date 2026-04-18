from fastapi.testclient import TestClient

from app.api import auth
from app.main import app


client = TestClient(app)


def test_forgot_password_hint_returns_relative_path(monkeypatch, tmp_path):
    monkeypatch.setattr(auth, "PASSWORD_FILE", tmp_path / "workspace" / "password.txt")

    response = client.get("/api/auth/forgot-password-hint")

    assert response.status_code == 200
    assert response.json()["file_path"] == "workspace/password.txt"


def test_password_setup_validation_failure_does_not_create_password_file(monkeypatch, tmp_path):
    password_file = tmp_path / "workspace" / "password.txt"
    monkeypatch.setattr(auth, "PASSWORD_FILE", password_file)

    response = client.post("/api/auth/setup", json={"password": "short"})

    assert response.status_code == 422
    assert not password_file.exists()


def test_password_hash_save_failure_does_not_leave_password_file(monkeypatch, tmp_path):
    password_file = tmp_path / "workspace" / "password.txt"
    monkeypatch.setattr(auth, "PASSWORD_FILE", password_file)

    def fail_replace(*args, **kwargs):
        raise OSError("disk full")

    monkeypatch.setattr(auth.os, "replace", fail_replace)

    try:
        auth._save_password_hash("Aa123456")
    except OSError:
        pass

    assert not password_file.exists()


def test_old_jwt_is_rejected_after_password_reset(monkeypatch, tmp_path):
    password_file = tmp_path / "workspace" / "password.txt"
    monkeypatch.setattr(auth, "PASSWORD_FILE", password_file)

    first_setup = client.post("/api/auth/setup", json={"password": "Aa123456"})
    assert first_setup.status_code == 200
    old_token = first_setup.json()["token"]

    authorized_before_reset = client.get(
        "/api/settings",
        headers={"Authorization": f"Bearer {old_token}"},
    )
    assert authorized_before_reset.status_code == 200

    password_file.unlink()

    second_setup = client.post("/api/auth/setup", json={"password": "Bb123456"})
    assert second_setup.status_code == 200
    new_token = second_setup.json()["token"]

    rejected_old_token = client.get(
        "/api/settings",
        headers={"Authorization": f"Bearer {old_token}"},
    )
    assert rejected_old_token.status_code == 401

    accepted_new_token = client.get(
        "/api/settings",
        headers={"Authorization": f"Bearer {new_token}"},
    )
    assert accepted_new_token.status_code == 200
