import subprocess


def run():
    RUN = "uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload"
    command = RUN
    return subprocess.call(command, shell=True)


if __name__ == "__main__":
    run()
