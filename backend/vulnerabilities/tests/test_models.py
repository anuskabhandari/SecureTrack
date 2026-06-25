import pytest
from backend.vulnerabilities.models import Vulnerability

@pytest.mark.django_db
def test_create_vulnerability():
    vuln = Vulnerability.objects.create(
        title="SQL Injection",
        severity="High",
        status="Open"
    )

    assert vuln.title == "SQL Injection"